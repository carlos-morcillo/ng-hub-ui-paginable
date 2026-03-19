import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef, computed, contentChild, inject, input, model } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe, UcfirstPipe } from 'ng-hub-ui-utils';
import { PaginableListItemDirective } from '../../../directives/paginable-list-item.directive';
import { PaginableNoResultsDirective } from '../../../directives/paginable-no-results.directive';
import { SelectionTypes } from '../../../enums/selection-types';
import { ListClickEvent } from '../../../interfaces/item-click-event';
import { PaginableActionButton } from '../../../interfaces/paginable-action-button';
import { PaginableTableDropdown } from '../../../interfaces/paginable-table-dropdown';
import { PaginableTableOptions } from '../../../interfaces/paginable-table-options';
import { getValue } from '../../../utils';
import { PaginatorComponent } from '../../paginator/paginator.component';

@Component({
	selector: 'hub-list, hub-ui-list, hub-paginable-list',
	templateUrl: './list.component.html',
	styleUrl: './list.component.scss',
	host: {
		class: 'd-flex flex-column gap-4',
		'[class.hub-list--rtl]': 'isRtl()'
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: ListComponent,
			multi: true
		}
	],
	imports: [ReactiveFormsModule, FormsModule, PaginatorComponent, TranslatePipe, UcfirstPipe, NgTemplateOutlet, NgClass],
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

	readonly paginate = input<boolean>(false);
	readonly page = model<number>(1);
	readonly perPage = model<number>(10);
	readonly perPageOptions = input<Array<number>>([10, 20, 50]);
	readonly totalItems = model<number>(0);

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

	// NOTE: Otros
	isDisabled: boolean = false;

	onChange: any = () => {};
	onTouch: any = () => {};

	// NOTE: Filters

	searchFG = this.#fb.control('');

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
		const tokens = Array.isArray(classList)
			? classList
			: typeof classList === 'string'
				? classList.split(/\s+/)
				: [];
		return [...new Set(tokens.map((item) => item.trim()).filter(Boolean))];
	}
}

export { ListComponent as PaginableListComponent };
