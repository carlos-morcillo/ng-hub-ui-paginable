import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectorRef,
	Component,
	DestroyRef,
	ElementRef,
	Input,
	TemplateRef,
	computed,
	contentChild,
	inject,
	input,
	model,
	output,
	signal
} from '@angular/core';
import {
	AbstractControl,
	FormArray,
	FormBuilder,
	FormControl,
	FormsModule,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule
} from '@angular/forms';
import { generateUniqueId, getValue, TranslatePipe, UcfirstPipe } from 'ng-hub-ui-utils';
import { HubListDragPlaceholderDirective } from '../../../directives/list-drag-placeholder.directive';
import { HubListDragPreviewDirective } from '../../../directives/list-drag-preview.directive';
import { PaginableErrorDirective } from '../../../directives/paginable-error.directive';
import { PaginableListItemDirective } from '../../../directives/paginable-list-item.directive';
import { PaginableLoadingDirective } from '../../../directives/paginable-loading.directive';
import { PaginableNoResultsDirective } from '../../../directives/paginable-no-results.directive';
import { SelectionTypes } from '../../../enums/selection-types';
import { ListClickEvent } from '../../../interfaces/item-click-event';
import { ListSortEvent } from '../../../interfaces/list-sort-event';
import { PaginableActionButton } from '../../../interfaces/paginable-action-button';
import { PaginableTableDropdown } from '../../../interfaces/paginable-table-dropdown';
import { PaginableStateDefault } from '../../../interfaces/paginable-state';
import { PaginableTableOptions } from '../../../interfaces/paginable-table-options';
import { DragPointerMode, DragTarget, HubListDragService } from '../../../services/hub-list-drag.service';
import { PaginableDefaultsService } from '../../../services/paginable-defaults.service';
import { PaginableService } from '../../../services/paginable.service';
import { PaginableStateOutlet } from '../../state-outlet/paginable-state-outlet.component';
import {
	computeTargetIndex,
	containsNode,
	ListDragContainerRef,
	moveControlInFormArray,
	moveItemInArray,
	resolveDropPosition,
	toAbsoluteIndex,
	transferArrayItem,
	transferControlBetweenFormArrays
} from '../../../utils/list-drag.utils';
import { createPointerDragSession, PointerDragSession } from '../../../utils/list-pointer-drag';
import { PaginatorComponent } from '../../paginator/paginator.component';

/**
 * Internal state held while reordering an item by keyboard.
 */
interface KeyboardDragState {
	/** Container the grabbed item lives in. */
	container: ListDragContainerRef;
	/** Current absolute index of the grabbed item. */
	index: number;
	/** Absolute index the item had when it was grabbed. */
	originalIndex: number;
	/** The grabbed item. */
	item: any;
}

@Component({
	selector: 'hub-list, hub-ui-list, hub-paginable-list',
	templateUrl: './list.component.html',
	styleUrl: './list.component.scss',
	host: {
		class: 'hub-list',
		'[class.hub-list--rtl]': 'isRtl()',
		'[attr.data-variant]': 'options.variant ?? null',
		'[attr.data-hub-drag-owner]': '_listId'
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: ListComponent,
			multi: true
		}
	],
	imports: [
		ReactiveFormsModule,
		FormsModule,
		PaginatorComponent,
		TranslatePipe,
		UcfirstPipe,
		NgTemplateOutlet,
		NgClass,
		PaginableStateOutlet
	],
	standalone: true
})
/**
 * A component for displaying a paginable and selectable list of items.
 *
 * @export
 * @class ListComponent
 * @template T The type of data for each item in the list.
 */
export class ListComponent<T = any> {
	#fb = inject(FormBuilder);
	#cdr = inject(ChangeDetectorRef);
	#host = inject(ElementRef);
	#destroyRef = inject(DestroyRef);

	/**
	 * Coordinator backing drag-and-drop reordering and cross-list transfers. Exposed to the
	 * template so it can read the active drag (e.g. for the placeholder context).
	 */
	protected readonly dragService = inject(HubListDragService);

	/** Stable identifier of this list instance, reflected as `data-hub-drag-owner` on the host. */
	readonly _listId = generateUniqueId(12);

	/** Resolved application-wide default state components. */
	readonly defaults = inject(PaginableDefaultsService);

	/** Application-wide paginable configuration (holds the input defaults). */
	readonly #config = inject(PaginableService);

	/** Resolved default input values from {@link providePaginable}. */
	get #defaults() {
		return this.#config.config.defaults ?? {};
	}

	/** Loading state indicator for the list. Consumer-driven. */
	readonly loading = model<boolean>(false);

	/**
	 * Error state holder. When set to a truthy value the list renders its error
	 * state. Consumer-driven, mirroring {@link loading}.
	 */
	readonly error = model<unknown | null>(null);

	/** Per-instance default component for the loading state. */
	readonly loadingComponent = input<PaginableStateDefault | null>(null);
	/** Per-instance default component for the error state. */
	readonly errorComponent = input<PaginableStateDefault | null>(null);
	/** Per-instance default component for the no-results state. */
	readonly noResultsComponent = input<PaginableStateDefault | null>(null);

	readonly bindValue = input<string>();
	readonly bindLabel = input<string>('label');
	readonly bindChildren = input<string>('children');

	readonly selectable = input<SelectionTypes | boolean | null, SelectionTypes | boolean | null>(null, {
		transform: (value) => {
			if (value === true) {
				return SelectionTypes.Single;
			}
			if (value === false || value == null) {
				return null;
			}
			return value;
		}
	});

	readonly paginate = input<boolean>(this.#defaults.paginate ?? false);
	readonly page = model<number>(1);
	readonly perPage = model<number>(this.#defaults.perPage ?? 10);
	readonly perPageOptions = input<Array<number>>(this.#defaults.perPageOptions ?? [10, 20, 50]);
	readonly totalItems = model<number>(0);

	/**
	 * Enables drag-and-drop reordering of the list items (native HTML5 drag-and-drop, with a
	 * Pointer Events fallback for touch devices).
	 */
	readonly sortable = input<boolean>(false);

	/**
	 * Shared drag group. Lists with the same non-null group can exchange items via
	 * cross-list transfers. When `null` (default), only in-list reordering is allowed.
	 */
	readonly dragGroup = input<string | null>(null);

	/**
	 * Predicate marking an item as non-draggable. Disabled items cannot be picked up.
	 */
	readonly sortDisabled = input<(item: T) => boolean>(() => false);

	/**
	 * Enables keyboard reordering on the focusable row: `Space`/`Enter` to pick up and drop,
	 * arrow keys to move, `Escape` to cancel. Opt-in for accessibility.
	 */
	readonly keyboardSortable = input<boolean>(false);

	/**
	 * Draws a vertical connector between consecutive items — a timeline / pipeline look.
	 * Opt-in and default-off; applies to the list (column) display only, not cards. Style
	 * it through the `--hub-list-connector-*` variables.
	 */
	readonly connected = input<boolean>(false);

	/**
	 * Emitted by the destination list after a drag-and-drop reorder or cross-list transfer.
	 */
	readonly sorted = output<ListSortEvent<T>>();

	readonly numberOfPages = computed(() => {
		const perPage = this.perPage();
		const totalItems = this.totalItems() || this._items.length;

		if (perPage && totalItems) {
			return Math.ceil(totalItems / perPage);
		}
		return 1;
	});

	readonly multipleSelectable = computed(() => this.selectable() === SelectionTypes.Multiple);

	private _options: PaginableTableOptions = {
		display: 'list',
		rtl: false,
		cursor: 'default',
		hoverableRows: false,
		striped: null,
		variant: null,
		searchable: false,
		collapsed: true
	};
	get options(): PaginableTableOptions {
		return this._options;
	}
	@Input()
	set options(v: PaginableTableOptions) {
		this._options = {
			...this._options,
			...(v ?? {})
		};
		this.buildForm(this.form, this._items);
	}

	/**
	 * Returns whether right-to-left mode is enabled.
	 *
	 * @returns `true` when RTL mode is active for the list.
	 */
	isRtl(): boolean {
		return this.options.rtl === true;
	}

	/**
	 * Returns whether the root list should render using card layout.
	 *
	 * @returns `true` when the configured display mode is `cards`.
	 */
	isCardsDisplay(): boolean {
		return this.options.display === 'cards';
	}

	private _items: any = [];
	@Input()
	get items(): any {
		return this._items;
	}
	set items(v: any) {
		this._items = v ?? [];
		this.form.clear();
		this.buildForm(this.form, this._items);
		this.onSelectionChange();
	}

	/**
	 * A function that is called when an item in the list is clicked.
	 * @type {() => (event: ListClickEvent<T>) => void | Promise<void>}
	 * @memberof ListComponent
	 */
	readonly clickFn = input<(event: ListClickEvent<T>) => void | Promise<void>>(() => {});

	/**
	 * A string or function to apply a class to each row of the list.
	 * If a string is provided, it is used as the class for all rows.
	 * If a function is provided, it is called with the item data and should return a string representing the class.
	 * @type {(string | ((item: T) => string))}
	 * @memberof ListComponent
	 */
	readonly rowClass = input<string | ((item: T) => string)>();

	form: FormArray = this.#fb.array([]);

	value: Array<any> = [];

	// NOTE: Templates

	readonly itemTpt = contentChild(PaginableListItemDirective, { read: TemplateRef });

	/**
	 * Custom template rendered when the list has no visible items to display.
	 */
	readonly noResultsTpt = contentChild(PaginableNoResultsDirective, { read: TemplateRef });

	/** Custom template rendered while the list is loading. */
	readonly loadingTpt = contentChild(PaginableLoadingDirective, { read: TemplateRef });

	/** Custom template rendered when the list is in an error state. */
	readonly errorTpt = contentChild(PaginableErrorDirective, { read: TemplateRef });

	/**
	 * Custom template for the drop placeholder shown while dragging.
	 */
	readonly placeholderTpt = contentChild(HubListDragPlaceholderDirective, { read: TemplateRef });

	/**
	 * Custom template for the drag preview (ghost) that follows the pointer.
	 */
	readonly previewTpt = contentChild(HubListDragPreviewDirective, { read: TemplateRef });

	// NOTE: Otros
	isDisabled: boolean = false;

	onChange: any = () => {};
	onTouch: any = () => {};

	// NOTE: Filters

	searchFG = this.#fb.control('');

	// NOTE: Drag & drop internal state

	/** Per-container registry keyed by container key, used by Pointer Events hit-testing. */
	readonly #containers = new Map<string, ListDragContainerRef>();
	/** Active Pointer Events session (touch fallback), or `null`. */
	#pointerSession: PointerDragSession | null = null;
	/** Cleans up the native custom drag image, or `null`. */
	#dragImageCleanup: (() => void) | null = null;
	/**
	 * The row whose most recent `pointerdown` landed on a valid drag-start zone. Native
	 * `dragstart.target` is the draggable `<li>` (not the pressed descendant), so the handle
	 * gate is resolved on `pointerdown` and consulted here.
	 */
	#dragStartLi: HTMLElement | null = null;
	/** Active keyboard reorder state, or `null`. */
	#keyboardDrag: KeyboardDragState | null = null;
	/** Screen-reader announcement (translation key + params) for keyboard reordering. */
	readonly #announcement = signal<{ key: string; params?: Record<string, unknown> } | null>(null);
	/** Read-only announcement signal for the template `aria-live` region. */
	readonly announcement = this.#announcement.asReadonly();

	constructor() {
		this.dragService.register({
			ownerId: this._listId,
			group: () => this.dragGroup(),
			refresh: () => this.#refreshSelf(),
			commit: () => this.#commitDrop(),
			resolveTarget: (element, clientX, clientY) => this.resolveTarget(element, clientX, clientY)
		});
		this.#destroyRef.onDestroy(() => {
			this.#pointerSession?.destroy();
			this.dragService.unregister(this._listId);
		});
	}

	// NOTE: Batch actions

	/**
	 * Collection of actions for items
	 *
	 * @type {PaginableTableRowAction[]}
	 * @memberof PaginableTableComponent
	 */
	private _batchActions: Array<PaginableTableDropdown | PaginableActionButton> = [];
	@Input()
	get batchActions(): Array<PaginableTableDropdown | PaginableActionButton> {
		return this._batchActions;
	}
	set batchActions(v: Array<PaginableTableDropdown | PaginableActionButton>) {
		this._batchActions = v.map((b) => {
			if ((b as PaginableTableDropdown).buttons) {
				b = { fill: null, position: 'start', color: 'light', ...b };
			}
			return b;
		});
	}

	// NOTE: Control access value

	writeValue(value: Array<T> = []): void {
		this.value = Array.isArray(value) ? [...value] : [];
		this.applySelectionFromValue(this.form.controls, this.value);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	/**
	 * Handles the action to be executed in a batch
	 *
	 * @param {Event} event
	 * @memberof PaginableTableComponent
	 */
	handleBatchAction(event: any) {
		const handler = event.handler as ((items: ReadonlyArray<T>) => void) | undefined;
		handler?.(this.value);
	}

	/**
	 * Returns normalized CSS classes for list batch action buttons.
	 * Ensures a default BEM class is present when no list-specific class is provided.
	 *
	 * @param action Batch action button definition.
	 * @returns List of CSS class names to bind in template.
	 */
	getBatchActionClassList(action: PaginableActionButton): Array<string> {
		const normalized = this.normalizeClassList(action.classlist);
		if (!normalized.some((item) => item.startsWith('hub-list__'))) {
			return ['hub-list__batch-action-btn--default', ...normalized];
		}
		return normalized;
	}

	buildForm(form: FormArray, items: ReadonlyArray<any>) {
		form.clear();
		for (const index in items) {
			if (Object.prototype.hasOwnProperty.call(items, index)) {
				const item = items[index];

				const group = this.#fb.group({
					selected: [false],
					collapsed: [this.options.collapsed],
					data: [item],
					children: this.#fb.array([])
				});

				group.patchValue(item);

				if (item[this.bindChildren()]?.length) {
					this.buildForm(group.get('children') as FormArray, item[this.bindChildren()]);
					// newItem['children'] = this.buildValue(children);
				}
				form.push(group);
			}
		}
	}

	/**
	 * Returns the visible controls for the current page in root level.
	 * Nested controls are intentionally not paginated.
	 */
	getVisibleControls(controls: ReadonlyArray<AbstractControl>, isRoot: boolean): ReadonlyArray<AbstractControl> {
		if (!isRoot || !this.paginate()) {
			return controls;
		}
		const { start, end } = this.getSliceRange(controls.length);
		return controls.slice(start, end);
	}

	/**
	 * Returns the visible items for the current page in root level.
	 * Nested items are intentionally not paginated.
	 */
	getVisibleItems(items: ReadonlyArray<any>, isRoot: boolean): ReadonlyArray<any> {
		if (!isRoot || !this.paginate()) {
			return items;
		}
		const { start, end } = this.getSliceRange(items.length);
		return items.slice(start, end);
	}

	/**
	 * Handles item selection changes and propagates selected values through ControlValueAccessor.
	 */
	onSelectionChange(): void {
		this.value = this.collectSelectedValues(this.form.controls);
		this.onChange(this.value);
		this.onTouch();
	}

	/**
	 * Handles per-page changes and resets pagination to the first page.
	 */
	onPerPageChange(event: Event | number): void {
		const normalizedValue = typeof event === 'number' ? event : Number((event.target as HTMLSelectElement | null)?.value);

		if (!Number.isFinite(normalizedValue) || normalizedValue <= 0) {
			return;
		}

		this.perPage.set(normalizedValue);
		this.page.set(1);
	}

	buildValue(items: ReadonlyArray<T>): Array<T & { collapsed: boolean }> {
		const value: Array<T & { collapsed: boolean }> = [];
		for (const item of items) {
			const { children, ...newItem } = item as any;
			if (children?.length) {
				newItem['children'] = this.buildValue(children);
			}
			value.push({
				...newItem,
				collapsed: true
			});
		}
		return value;
	}

	toggleCollapsed(control: FormControl) {
		control.patchValue(!control.value);
	}

	/**
	 * Emits a structured click event for the clicked list item, including metadata and state.
	 *
	 * This method is typically called when an item in the list is clicked. It extracts contextual
	 * information such as depth, index, selection state, and expansion state, then passes it to
	 * the user-defined `clickFn` callback.
	 *
	 * If a `bindLabel` is configured, the emitted `value` will be derived from that property;
	 * otherwise, the full item will be passed as `value`.
	 *
	 * @param item - The list item object, including `selected` and `collapsed` state.
	 * @param depth - The nesting depth of the item within a tree structure (0 = root level).
	 * @param index - The position of the item in the current visible list or page.
	 * @param event - The native `MouseEvent` that triggered the click.
	 *
	 * @remarks
	 * If the `clickFn` callback is not defined, the method exits early and no event is emitted.
	 */
	onItemClick({ collapsed, selected, ...item }: any, depth: number, index: number, event: MouseEvent) {
		const clickFn = this.clickFn();
		if (!clickFn) {
			return;
		}

		const bindLabel = this.bindLabel();
		clickFn({
			depth,
			index,
			selected,
			collapsed,
			value: bindLabel ? getValue(item, bindLabel) : item,
			item: item as T,
			mouseEvent: event
		});
	}

	onPageClicked(page: number) {
		// if (!this.data) {
		// 	return;
		// }
		// this.data.currentPage = page;
		// this.triggerTheParamChanges();
	}

	filter() {
		// if (!this.data) {
		// 	return;
		// }
		// this.data.currentPage = 1;
		// this.filterChange.emit({
		// 	searchText: this.searchFG?.value ?? null,
		// 	specificSearch: this.specificSearchFG?.value ?? null
		// });
	}

	/**
	 * Returns the total amount of items considering explicit totalItems or local items length.
	 */
	getEffectiveTotalItems(): number {
		return this.totalItems() || this._items.length;
	}

	private getSliceRange(total: number): { start: number; end: number } {
		const perPage = Math.max(1, this.perPage() || total || 1);
		const page = Math.max(1, this.page() || 1);
		const start = (page - 1) * perPage;
		const end = start + perPage;
		return { start, end };
	}

	/**
	 * Returns the absolute index of the first item rendered on the current root page.
	 *
	 * @returns The slice start offset (0 when pagination is disabled).
	 */
	getRootSliceStart(): number {
		return this.paginate() ? this.getSliceRange(this._items.length).start : 0;
	}

	/**
	 * Returns a stable tracking key for list rendering.
	 *
	 * @param item Current rendered item.
	 * @param index Positional fallback when no stable key exists.
	 * @returns Tracking key used by Angular control flow.
	 */
	protected getTrackKey(item: any, index: number): string | number {
		if (!item) {
			return index;
		}

		const bindValue = this.bindValue();
		if (bindValue) {
			const resolved = getValue(item, bindValue);
			if (resolved != null) {
				return resolved;
			}
		}

		if (item.id != null) {
			return item.id;
		}

		return index;
	}

	// NOTE: Drag & drop

	/**
	 * Maps a rendered (slice-relative) index to its absolute index in the underlying
	 * collection, accounting for root pagination.
	 *
	 * @param visibleIndex Index within the rendered slice.
	 * @param isRoot Whether the row belongs to the paginated root collection.
	 * @returns The absolute index.
	 */
	protected absoluteIndex(visibleIndex: number, isRoot: boolean): number {
		return isRoot ? toAbsoluteIndex(visibleIndex, this.getRootSliceStart()) : visibleIndex;
	}

	/**
	 * Builds (and registers, for Pointer Events hit-testing) the drag container reference for
	 * a rendered collection.
	 *
	 * @param controlsForm The full `FormArray` backing the collection.
	 * @param itemsFull The full data array backing the collection.
	 * @param parentItem The parent item owning the collection, or `null` for the root.
	 * @param depth Nesting depth.
	 * @returns The container reference.
	 */
	protected makeContainerRef(
		controlsForm: FormArray,
		itemsFull: any[],
		parentItem: any,
		depth: number
	): ListDragContainerRef {
		const key = depth === 0 ? `${this._listId}:root` : `${this._listId}:${depth}:${this.getTrackKey(parentItem, depth)}`;
		const ref: ListDragContainerRef = {
			key,
			ownerId: this._listId,
			group: this.dragGroup(),
			items: itemsFull ?? [],
			form: controlsForm,
			parentItem: parentItem ?? null,
			depth
		};
		this.#containers.set(key, ref);
		return ref;
	}

	/**
	 * Returns whether reordering is enabled for a row.
	 *
	 * @param item The row item.
	 * @returns `true` when the row can be dragged.
	 */
	protected isDragEnabled(item: any): boolean {
		return this.sortable() && !this.isRowDisabled(item);
	}

	/**
	 * Returns whether a row is explicitly non-draggable via `sortDisabled`.
	 *
	 * @param item The row item.
	 * @returns `true` when the row is disabled for dragging.
	 */
	protected isRowDisabled(item: any): boolean {
		const fn = this.sortDisabled();
		return typeof fn === 'function' ? !!fn(item) : false;
	}

	/**
	 * Returns whether a row is currently being dragged (native/pointer/keyboard).
	 *
	 * @param item The row item.
	 * @returns `true` when the row is the active drag item.
	 */
	protected isRowDragging(item: any): boolean {
		return this.dragService.active()?.item === item || this.#keyboardDrag?.item === item;
	}

	/**
	 * Returns the absolute placeholder gap index for a container, or `null` when no
	 * placeholder should render in it.
	 *
	 * @param controlsForm The collection's `FormArray`.
	 * @returns The gap index, or `null`.
	 */
	#placeholderGap(controlsForm: FormArray): number | null {
		const target = this.dragService.target();
		if (!target || (target.container as ListDragContainerRef).form !== controlsForm) {
			return null;
		}
		if (target.atEnd) {
			return target.container.items.length;
		}
		return target.position === 'after' ? target.index + 1 : target.index;
	}

	/**
	 * Returns whether the placeholder should render before the row at the given absolute index.
	 *
	 * @param controlsForm The collection's `FormArray`.
	 * @param absoluteIndex Absolute index of the row.
	 * @returns `true` when a placeholder belongs before the row.
	 */
	protected showPlaceholderBefore(controlsForm: FormArray, absoluteIndex: number): boolean {
		return this.#placeholderGap(controlsForm) === absoluteIndex;
	}

	/**
	 * Returns whether the placeholder should render after the last visible row of a container.
	 *
	 * @param controlsForm The collection's `FormArray`.
	 * @param isRoot Whether the collection is the paginated root.
	 * @param visibleCount Number of rendered rows.
	 * @returns `true` when a placeholder belongs at the end.
	 */
	protected showPlaceholderAtEnd(controlsForm: FormArray, isRoot: boolean, visibleCount: number): boolean {
		const gap = this.#placeholderGap(controlsForm);
		if (gap === null) {
			return false;
		}
		const endIndex = isRoot ? this.getRootSliceStart() + visibleCount : visibleCount;
		return gap === endIndex;
	}

	/**
	 * Determines whether a drag may start from the given pointer/drag event, honouring drag
	 * handles declared in the item template.
	 *
	 * @param event The triggering event.
	 * @param li The row element.
	 * @returns `true` when the gesture may start a drag.
	 */
	#canStartDrag(event: Event, li: HTMLElement): boolean {
		const handles = Array.from(li.querySelectorAll('.hub-list__drag-handle')).filter(
			(handle) => handle.closest('.hub-list__item') === li
		);
		if (!handles.length) {
			return true;
		}
		const targetHandle = (event.target as HTMLElement).closest('.hub-list__drag-handle');
		return !!targetHandle && targetHandle.closest('.hub-list__item') === li;
	}

	/**
	 * Returns whether an event originated on an interactive control (checkbox, button, link…).
	 *
	 * @param event The triggering event.
	 * @returns `true` when the target is interactive.
	 */
	#isInteractiveTarget(event: Event): boolean {
		return !!(event.target as HTMLElement).closest('input, button, a, select, textarea');
	}

	/**
	 * Returns whether an event belongs to the given row rather than to one of its descendant
	 * rows in a nested list. Drag/pointer/keyboard events bubble through ancestor `<li>`s, and
	 * each `<li>` carries the same handlers; this keeps only the innermost row acting.
	 *
	 * @param event The triggering event.
	 * @param li The row element the handler is bound to.
	 * @returns `true` when the event's closest item is exactly this row.
	 */
	#isEventForRow(event: Event, li: HTMLElement): boolean {
		return (event.target as HTMLElement).closest('.hub-list__item') === li;
	}

	/**
	 * Records the start of a drag in the coordinator.
	 *
	 * @param container Source container.
	 * @param index Absolute source index.
	 * @param item The dragged item.
	 * @param mode Transport driving the gesture.
	 */
	#beginDrag(container: ListDragContainerRef, index: number, item: any, mode: DragPointerMode): void {
		this.dragService.begin({
			sourceId: this._listId,
			sourceGroup: this.dragGroup(),
			item,
			sourceContainer: container,
			sourceIndex: index,
			pointerMode: mode
		});
	}

	/**
	 * Returns whether dropping into the given container is forbidden (own subtree cycle or a
	 * group mismatch).
	 *
	 * @param container Candidate destination container.
	 * @returns `true` when the drop must be rejected.
	 */
	#forbidsDrop(container: ListDragContainerRef): boolean {
		const active = this.dragService.active();
		if (!active) {
			return true;
		}
		return containsNode(active.item, container.parentItem, this.bindChildren());
	}

	/**
	 * Native HTML5 `dragstart` handler.
	 *
	 * @param event Drag event.
	 * @param container Source container.
	 * @param absoluteIndex Absolute source index.
	 * @param item Dragged item.
	 */
	onDragStart(event: DragEvent, container: ListDragContainerRef, absoluteIndex: number, item: any): void {
		const li = event.currentTarget as HTMLElement;
		// In nested lists the event bubbles through ancestor items; only the source item acts.
		if (!this.#isEventForRow(event, li)) {
			return;
		}
		// `dragstart.target` is the draggable `<li>`, never the pressed descendant, so the
		// handle gate is evaluated on `pointerdown` (see `onPointerDown`) and consulted here.
		if (!this.sortable() || this.isRowDisabled(item) || this.#dragStartLi !== li) {
			event.preventDefault();
			return;
		}
		this.#dragStartLi = null;
		if (event.dataTransfer) {
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.setData('application/x-hub-list', this._listId);
		}
		this.#beginDrag(container, absoluteIndex, item, 'native');
		this.#applyNativeDragImage(event, item);
		this.#cdr.markForCheck();
	}

	/**
	 * Native HTML5 `dragover`/`dragenter` handler. Computes and publishes the drop target.
	 *
	 * @param event Drag event.
	 * @param container Hovered container.
	 * @param absoluteIndex Absolute index of the hovered row.
	 */
	onDragOver(event: DragEvent, container: ListDragContainerRef, absoluteIndex: number): void {
		if (!this.dragService.isDragging()) {
			return;
		}
		const li = event.currentTarget as HTMLElement;
		// In nested lists the event bubbles through ancestor items; only the innermost hovered
		// item must compute the target (otherwise an ancestor would clobber it).
		if (!this.#isEventForRow(event, li)) {
			return;
		}
		if (!this.dragService.canDrop(this._listId) || this.#forbidsDrop(container)) {
			if (event.dataTransfer) {
				event.dataTransfer.dropEffect = 'none';
			}
			return;
		}
		event.preventDefault();
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
		const rect = li.getBoundingClientRect();
		const isCards = container.depth === 0 && this.isCardsDisplay();
		const position = resolveDropPosition(event.clientX, event.clientY, rect, isCards ? 'grid' : 'vertical', this.isRtl());
		this.dragService.setTarget({ ownerId: this._listId, container, index: absoluteIndex, position, atEnd: false });
	}

	/**
	 * Native HTML5 `dragover` handler on the collection element. Handles the empty-collection
	 * case so an empty list (e.g. in a group) is still a valid drop target.
	 *
	 * @param event Drag event.
	 * @param container Hovered container.
	 */
	onContainerDragOver(event: DragEvent, container: ListDragContainerRef): void {
		if (!this.dragService.isDragging()) {
			return;
		}
		if (!this.dragService.canDrop(this._listId) || this.#forbidsDrop(container)) {
			if (event.dataTransfer) {
				event.dataTransfer.dropEffect = 'none';
			}
			return;
		}
		// Allow dropping anywhere over the collection — including the gaps and the placeholder
		// slot (the placeholder is `pointer-events: none`, so its hovers reach this `<ul>`).
		// This is what lets a drop "stay" when released on the prospective slot.
		event.preventDefault();
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
		if (container.items.length === 0) {
			// Empty collection: no items to hover, so target the start.
			this.dragService.setTarget({ ownerId: this._listId, container, index: 0, position: 'before', atEnd: true });
		}
		// Non-empty: keep the precise target set by the most recent item-level `dragover`.
	}

	/**
	 * Native HTML5 `drop` handler on a row.
	 *
	 * @param event Drag event.
	 */
	onDrop(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.#commitDrop();
	}

	/**
	 * Native HTML5 `drop` handler on the collection element (empty-collection case).
	 *
	 * @param event Drag event.
	 */
	onContainerDrop(event: DragEvent): void {
		event.preventDefault();
		this.#commitDrop();
	}

	/**
	 * Native HTML5 `dragend` handler. Restores state and removes the custom drag image.
	 */
	onDragEnd(): void {
		this.#dragImageCleanup?.();
		this.#dragImageCleanup = null;
		this.dragService.end();
		this.#cdr.markForCheck();
	}

	/**
	 * Pointer Events `pointerdown` handler — the touch/pen drag fallback. Mouse pointers are
	 * ignored so native drag-and-drop drives the desktop experience.
	 *
	 * @param event Pointer event.
	 * @param container Source container.
	 * @param absoluteIndex Absolute source index.
	 * @param item Dragged item.
	 */
	onPointerDown(event: PointerEvent, container: ListDragContainerRef, absoluteIndex: number, item: any): void {
		const li = event.currentTarget as HTMLElement;
		// In nested lists the event bubbles through ancestor items; only the innermost pressed
		// item arms, so an ancestor never overwrites `#dragStartLi`.
		if (!this.#isEventForRow(event, li)) {
			return;
		}
		if (!this.sortable() || this.isRowDisabled(item)) {
			this.#dragStartLi = null;
			return;
		}
		const onHandle = !!(event.target as HTMLElement).closest('.hub-list__drag-handle');
		// `pointerdown` sees the real pressed element, so the handle/interactive gate is resolved
		// here and remembered for the upcoming native `dragstart` (whose target is the `<li>`).
		const allowed = (!this.#isInteractiveTarget(event) || onHandle) && this.#canStartDrag(event, li);
		this.#dragStartLi = allowed ? li : null;
		if (event.pointerType === 'mouse') {
			// Desktop pointers use the native HTML5 drag-and-drop path.
			return;
		}
		if (!allowed) {
			return;
		}
		this.#pointerSession = createPointerDragSession({
			startEvent: event,
			sourceEl: li,
			ghostFactory: () => this.#buildPointerGhost(li, item),
			onStart: () => {
				this.#beginDrag(container, absoluteIndex, item, 'pointer');
				this.#cdr.markForCheck();
			},
			onMove: (x, y) => this.#onPointerMove(x, y),
			onDrop: (x, y) => this.#onPointerDrop(x, y),
			onCancel: () => {
				this.dragService.end();
				this.#cdr.markForCheck();
			},
			onEnd: () => {
				this.#pointerSession = null;
				this.#cdr.markForCheck();
			}
		});
	}

	/**
	 * Updates the drop target while a Pointer Events drag is moving.
	 *
	 * @param clientX Pointer X.
	 * @param clientY Pointer Y.
	 */
	#onPointerMove(clientX: number, clientY: number): void {
		const active = this.dragService.active();
		if (!active) {
			return;
		}
		const target = this.dragService.resolveTargetAt(clientX, clientY);
		if (target && !containsNode(active.item, target.container.parentItem, this.bindChildren())) {
			this.dragService.setTarget(target);
		} else {
			this.dragService.setTarget(null);
		}
		this.#cdr.markForCheck();
	}

	/**
	 * Commits a Pointer Events drop by delegating to the destination list.
	 *
	 * @param clientX Pointer X.
	 * @param clientY Pointer Y.
	 */
	#onPointerDrop(clientX: number, clientY: number): void {
		this.#onPointerMove(clientX, clientY);
		const target = this.dragService.target();
		if (target) {
			this.dragService.requestCommit(target.ownerId);
		} else {
			this.dragService.end();
		}
		this.#cdr.markForCheck();
	}

	/**
	 * Builds the floating ghost element for the Pointer Events fallback.
	 *
	 * @param li The row element.
	 * @param item The dragged item.
	 * @returns The ghost element.
	 */
	#buildPointerGhost(li: HTMLElement, item: any): HTMLElement {
		const template = this.previewTpt();
		let ghost: HTMLElement;
		if (template) {
			const view = template.createEmbeddedView({ item });
			view.detectChanges();
			ghost = document.createElement('div');
			view.rootNodes.forEach((node: Node) => ghost.appendChild(node));
		} else {
			ghost = li.cloneNode(true) as HTMLElement;
		}
		// The ghost is mounted on <body>, outside this component's emulated encapsulation,
		// so the design tokens are read from the source row and applied inline.
		const styles = getComputedStyle(li);
		ghost.style.opacity = styles.getPropertyValue('--hub-list-ghost-opacity').trim() || '0.85';
		ghost.style.boxShadow = styles.getPropertyValue('--hub-list-ghost-shadow').trim() || '0 0.5rem 1rem rgba(0, 0, 0, 0.15)';
		return ghost;
	}

	/**
	 * Renders the custom drag preview off-screen and assigns it as the native drag image.
	 *
	 * @param event Drag event.
	 * @param item The dragged item.
	 */
	#applyNativeDragImage(event: DragEvent, item: any): void {
		const template = this.previewTpt();
		if (!template || !event.dataTransfer || typeof event.dataTransfer.setDragImage !== 'function') {
			return;
		}
		const view = template.createEmbeddedView({ item });
		view.detectChanges();
		const node = view.rootNodes.find((candidate: Node) => candidate.nodeType === Node.ELEMENT_NODE) as
			| HTMLElement
			| undefined;
		if (!node) {
			view.destroy();
			return;
		}
		const holder = document.createElement('div');
		holder.style.position = 'fixed';
		holder.style.top = '-9999px';
		holder.style.left = '-9999px';
		holder.appendChild(node);
		document.body.appendChild(holder);
		event.dataTransfer.setDragImage(node, 0, 0);
		this.#dragImageCleanup = () => {
			view.destroy();
			holder.remove();
		};
	}

	/**
	 * Resolves the drop target inside this list from a DOM element and pointer coordinates
	 * (used by the Pointer Events coordinator, including cross-list hovers).
	 *
	 * @param element Element under the pointer.
	 * @param clientX Pointer X.
	 * @param clientY Pointer Y.
	 * @returns The resolved target, or `null`.
	 */
	resolveTarget(element: HTMLElement, clientX: number, clientY: number): DragTarget | null {
		const ul = element.closest('.hub-list__items') as HTMLElement | null;
		const containerKey = ul?.getAttribute('data-hub-container-key');
		const container = containerKey ? this.#containers.get(containerKey) : null;
		if (!ul || !container || this.#forbidsDrop(container)) {
			return null;
		}
		const li = element.closest('.hub-list__item') as HTMLElement | null;
		if (!li || li.closest('.hub-list__items') !== ul || li.classList.contains('hub-list__item--empty')) {
			return { ownerId: this._listId, container, index: container.items.length, position: 'after', atEnd: true };
		}
		const indexAttr = li.getAttribute('data-hub-index');
		const index = indexAttr != null ? Number(indexAttr) : container.items.length;
		const rect = li.getBoundingClientRect();
		const isCards = container.depth === 0 && this.isCardsDisplay();
		const position = resolveDropPosition(clientX, clientY, rect, isCards ? 'grid' : 'vertical', this.isRtl());
		return { ownerId: this._listId, container, index, position, atEnd: false };
	}

	/**
	 * Commits the pending drop as the destination list: mutates the data array and the
	 * `FormArray` (in-list move or cross-list transfer), refreshes the affected views and
	 * emits the `sorted` event. Only the destination list performs the commit and emission.
	 */
	#commitDrop(): void {
		const active = this.dragService.active();
		const target = this.dragService.target();
		if (!active || !target || target.ownerId !== this._listId || !this.dragService.canDrop(this._listId)) {
			this.dragService.end();
			return;
		}
		const source = active.sourceContainer as ListDragContainerRef;
		const dest = target.container as ListDragContainerRef;
		if (this.#forbidsDrop(dest)) {
			this.dragService.end();
			return;
		}
		const sameContainer = source.form === dest.form;
		const fromIndex = active.sourceIndex;
		const item = source.items[fromIndex];
		if (item === undefined) {
			this.dragService.end();
			return;
		}
		const toIndex = target.atEnd
			? dest.items.length
			: computeTargetIndex(target.index, target.position === 'after', sameContainer, fromIndex);

		if (sameContainer) {
			moveItemInArray(dest.items, fromIndex, toIndex);
			moveControlInFormArray(dest.form, fromIndex, toIndex);
		} else {
			transferArrayItem(source.items, dest.items, fromIndex, toIndex);
			transferControlBetweenFormArrays(source.form, dest.form, fromIndex, toIndex);
		}

		const currentIndex = dest.items.indexOf(item);
		const event: ListSortEvent<T> = {
			previousIndex: fromIndex,
			currentIndex: currentIndex < 0 ? toIndex : currentIndex,
			item,
			items: [...dest.items],
			isTransfer: !sameContainer,
			previousGroup: active.sourceGroup,
			group: this.dragGroup(),
			previousItems: sameContainer ? undefined : [...source.items],
			depth: dest.depth,
			parentItem: dest.parentItem
		};

		this.#refreshSelf();
		if (!sameContainer) {
			this.dragService.refreshSource(active.sourceId);
		}
		this.dragService.end();
		this.sorted.emit(event);
	}

	/**
	 * Keyboard reorder handler bound to the focusable row.
	 *
	 * @param event Keyboard event.
	 * @param container The row's container.
	 * @param absoluteIndex Absolute index of the row.
	 * @param item The row item.
	 */
	onItemKeydown(event: KeyboardEvent, container: ListDragContainerRef, absoluteIndex: number, item: any): void {
		if (!this.keyboardSortable() || !this.sortable() || this.isRowDisabled(item)) {
			return;
		}
		// In nested lists the keydown bubbles through ancestor items; only the focused item acts.
		if (!this.#isEventForRow(event, event.currentTarget as HTMLElement)) {
			return;
		}
		const grab = this.#keyboardDrag;
		const key = event.key;

		if (key === ' ' || key === 'Spacebar' || key === 'Enter') {
			event.preventDefault();
			if (!grab) {
				this.#keyboardDrag = { container, index: absoluteIndex, originalIndex: absoluteIndex, item };
				this.#announce('DRAG_PICKED_UP', { index: absoluteIndex + 1, total: container.items.length });
			} else {
				this.#announce('DRAG_DROPPED_AT', { index: grab.index + 1, total: grab.container.items.length });
				this.#emitKeyboardSorted(grab);
				this.#keyboardDrag = null;
			}
			this.#cdr.markForCheck();
			return;
		}

		if (!grab) {
			return;
		}

		if (key === 'Escape') {
			event.preventDefault();
			this.#cancelKeyboardDrag(grab);
			return;
		}

		const isCards = container.depth === 0 && this.isCardsDisplay();
		let delta = 0;
		if (key === 'ArrowUp' || (isCards && key === 'ArrowLeft')) {
			delta = -1;
		} else if (key === 'ArrowDown' || (isCards && key === 'ArrowRight')) {
			delta = 1;
		} else {
			return;
		}

		event.preventDefault();
		const from = grab.index;
		const to = Math.max(0, Math.min(grab.container.items.length - 1, from + delta));
		if (to === from) {
			return;
		}
		moveItemInArray(grab.container.items, from, to);
		moveControlInFormArray(grab.container.form, from, to);
		grab.index = to;
		this.#refreshSelf();
		this.#announce('DRAG_MOVED_TO', { index: to + 1, total: grab.container.items.length });
	}

	/**
	 * Emits the `sorted` event for a completed keyboard reorder.
	 *
	 * @param grab The keyboard drag state.
	 */
	#emitKeyboardSorted(grab: KeyboardDragState): void {
		const currentIndex = grab.container.items.indexOf(grab.item);
		this.sorted.emit({
			previousIndex: grab.originalIndex,
			currentIndex: currentIndex < 0 ? grab.index : currentIndex,
			item: grab.item,
			items: [...grab.container.items],
			isTransfer: false,
			previousGroup: this.dragGroup(),
			group: this.dragGroup(),
			depth: grab.container.depth,
			parentItem: grab.container.parentItem
		});
	}

	/**
	 * Cancels an in-progress keyboard reorder, restoring the original position.
	 *
	 * @param grab The keyboard drag state.
	 */
	#cancelKeyboardDrag(grab: KeyboardDragState): void {
		if (grab.index !== grab.originalIndex) {
			moveItemInArray(grab.container.items, grab.index, grab.originalIndex);
			moveControlInFormArray(grab.container.form, grab.index, grab.originalIndex);
			this.#refreshSelf();
		}
		this.#announce('DRAG_CANCELLED');
		this.#keyboardDrag = null;
		this.#cdr.markForCheck();
	}

	/**
	 * Sets the screen-reader announcement.
	 *
	 * @param key Translation key.
	 * @param params Interpolation params.
	 */
	#announce(key: string, params?: Record<string, unknown>): void {
		this.#announcement.set({ key, params });
	}

	/**
	 * Re-renders this list after an in-place mutation of its data/form (drag reorder).
	 */
	#refreshSelf(): void {
		this._items = Array.isArray(this._items) ? [...this._items] : this._items;
		this.#cdr.markForCheck();
	}

	private collectSelectedValues(controls: ReadonlyArray<AbstractControl>): Array<any> {
		const selectedValues: Array<any> = [];

		for (const control of controls) {
			const group = control as any;
			const isSelected = !!group.get('selected')?.value;
			const data = group.get('data')?.value;

			if (isSelected) {
				selectedValues.push(this.resolveValue(data));
			}

			const children = (group.get('children') as FormArray | null)?.controls ?? [];
			if (children.length) {
				selectedValues.push(...this.collectSelectedValues(children));
			}
		}

		return selectedValues;
	}

	private applySelectionFromValue(controls: ReadonlyArray<AbstractControl>, selectedValues: ReadonlyArray<any>): void {
		for (const control of controls) {
			const group = control as any;
			const data = group.get('data')?.value;
			const value = this.resolveValue(data);
			const selected = selectedValues.some((selectedValue) => this.isEqual(selectedValue, value));

			group.get('selected')?.setValue(selected, { emitEvent: false });

			const children = (group.get('children') as FormArray | null)?.controls ?? [];
			if (children.length) {
				this.applySelectionFromValue(children, selectedValues);
			}
		}
	}

	private resolveValue(data: any): any {
		const bindValue = this.bindValue();
		return bindValue ? getValue(data, bindValue) : data;
	}

	private isEqual(a: any, b: any): boolean {
		if (a === b) {
			return true;
		}
		if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
			return JSON.stringify(a) === JSON.stringify(b);
		}
		return false;
	}

	/**
	 * Returns the class for a given row.
	 *
	 * @param {T} item The item for which to get the class.
	 * @returns {string} The class to apply to the row.
	 * @memberof ListComponent
	 */
	_getRowClass(item: T): string {
		const rowClass = this.rowClass();
		if (typeof rowClass === 'function') {
			return rowClass(item);
		} else if (typeof rowClass === 'string') {
			return rowClass;
		}
		return '';
	}

	/**
	 * Converts a class list input into a flat, deduplicated string array.
	 *
	 * @param classList Action `classlist` value.
	 * @returns Normalized class name array.
	 */
	private normalizeClassList(classList: string | Array<string> | undefined): Array<string> {
		const tokens = Array.isArray(classList) ? classList : typeof classList === 'string' ? classList.split(/\s+/) : [];
		return [...new Set(tokens.map((item) => item.trim()).filter(Boolean))];
	}
}

export { ListComponent as PaginableListComponent };
