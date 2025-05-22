import { animate, style, transition, trigger } from '@angular/animations';
import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
	Component,
	TemplateRef,
	computed,
	contentChild,
	contentChildren,
	effect,
	forwardRef,
	inject,
	input,
	model,
	viewChildren
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
	FormGroup,
	FormsModule,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
	UntypedFormBuilder
} from '@angular/forms';

import {
	BehaviorSubject,
	Observable,
	debounceTime,
	distinctUntilChanged,
	isObservable,
	of
} from 'rxjs';
import { TableBreakpoint } from '../../constants/breakpoints';
import { PaginableTableCellDirective } from '../../directives/paginable-table-cell.directive';
import { PaginableTableErrorDirective } from '../../directives/paginable-table-error.directive';
import { PaginableTableExpandingRowDirective } from '../../directives/paginable-table-expanding-row.directive';
import { PaginableTableFilterDirective } from '../../directives/paginable-table-filter.directive';
import { PaginableTableHeaderDirective } from '../../directives/paginable-table-header.directive';
import { PaginableTableLoadingDirective } from '../../directives/paginable-table-loading.directive';
import { PaginableTableNotFoundDirective } from '../../directives/paginable-table-not-found.directive';
import { PaginableTableRowDirective } from '../../directives/paginable-table-row.directive';
import { TableRowClickEvent } from '../../interfaces/item-click-event';
import {
	BatchTableButton,
	PaginableTableButton
} from '../../interfaces/paginable-table-button';
import { PaginableTableDropdown } from '../../interfaces/paginable-table-dropdown';
import { PaginableTableHeader } from '../../interfaces/paginable-table-header';
import { PaginableTableOptions } from '../../interfaces/paginable-table-options';
import { PaginableTableOrdination } from '../../interfaces/paginable-table-ordination';
import { PaginationState } from '../../interfaces/pagination-state';
import { TableRow } from '../../interfaces/table-row';
import { GetPipe } from '../../pipes/get.pipe';
import { IsObservablePipe } from '../../pipes/is-observable.pipe';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { UcfirstPipe } from '../../pipes/ucfirst.pipe';
import { UnwrapAsyncPipe } from '../../pipes/unwrap-async.pipe';
import { generateUniqueId } from '../../utils';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { HubIconComponent } from '../icon/icon.component';
import { MenuFilterComponent } from '../menu-filter/menu-filter.component';
import { PaginableTableDropdownComponent } from '../paginable-table-dropdown/paginable-table-dropdown.component';
import { PaginableTableRangeInputComponent } from '../paginable-table-range-input/paginable-table-range-input.component';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
	selector: 'hub-table, hub-ui-table',
	standalone: true,
	templateUrl: './table.component.html',
	imports: [
		NgClass,
		NgTemplateOutlet,
		AsyncPipe,
		ReactiveFormsModule,
		FormsModule,
		TranslatePipe,
		UcfirstPipe,
		UnwrapAsyncPipe,
		IsObservablePipe,
		PaginableTableDropdownComponent,
		PaginatorComponent,
		DropdownComponent,
		MenuFilterComponent,
		HubIconComponent,
		PaginatorComponent,
		PaginableTableRangeInputComponent,
		AsyncPipe,
		GetPipe
	],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({ opacity: 0 }),
				animate('256ms 256ms', style({ opacity: 1, height: 'auto' }))
			]),
			transition(':leave', [
				animate('256ms ease-out', style({ opacity: 0, height: '0' }))
			])
		])
	],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => HubTableComponent),
			multi: true
		}
	],
	host: {
		class: 'hub-table'
	}
})
export class HubTableComponent<T = any> {
	#fb = inject(UntypedFormBuilder);

	id = input(generateUniqueId(16));

	readonly options = input<PaginableTableOptions>({
		cursor: 'default',
		hoverableRows: false,
		striped: null,
		variant: null
	});

	/**
	 * Collection of selected rows
	 *
	 * @type {Array<T>}
	 * @memberof PaginableTableComponent
	 */
	value: Array<T> = [];

	/**
	 * Set whether all page rows are selecteds
	 *
	 * @type {boolean}
	 * @memberof PaginableTableComponent
	 */
	allRowsSelected: boolean = false;

	/**
	 * Time to ouput the filter form value
	 *
	 * @type {number}
	 * @memberof PaginableTableComponent
	 */
	readonly debounce = input<number>(0);

	readonly headers = model<Array<PaginableTableHeader | string>>([]);

	readonly fixedHeaders = computed(() => {
		const headers = this.headers();
		const fixedHeaders: Array<PaginableTableHeader> = headers.map(
			(header) => {
				if (typeof header === 'string') {
					return {
						title: header,
						property: header
					};
				}
				return header;
			}
		);

		// Parsing headers
		for (const header of fixedHeaders) {
			if (
				header.constructor.name === 'Object' &&
				header.buttons &&
				!header.property
			) {
				Object.assign(
					header,
					{ wrapping: 'nowrap', onlyButtons: true, align: 'end' },
					header
				);
			}
		}
		return fixedHeaders;
	});

	headersCount = computed(() => {
		let count = this.fixedHeaders().length;
		if (
			(this.selectable() && this.multiple()) ||
			this.batchActions().length
		) {
			count++;
		}
		if (
			this.templateExpandingRows()?.length /* &&
			!this.lastColumnOnlyHasButtons */
		) {
			count++;
		}
		return count;
	});

	headerFilters = computed(() => {
		const headerFilters = this.fixedHeaders().filter(
			(header) => header.filter
		);
		setTimeout(() => this.initializeFilterFG());
		return headerFilters;
	});

	readonly filters = model<Record<string, {}> | null>({});

	/**
	 * Filter form
	 *
	 * @type {FormGroup}
	 * @memberof PaginableTableComponent
	 */
	filtersFG: FormGroup = new FormGroup({});

	filterLoading: boolean = false;

	filterEffect = effect(() => {
		const filters = this.filters();

		// Le damos un poco de tiempo para
		setTimeout(() => {
			this.filtersFG.patchValue(filters ?? {}, { emitEvent: false });
		}, 16);
	});

	filtersChange = toSignal(
		this.filtersFG.valueChanges.pipe(debounceTime(this.debounce()))
	);

	filtersFGChangeEffect = effect(() => {
		const filters = this.filtersChange();
		if (filters === undefined) return;

		if (this.setFilters) {
			this.filters.set(filters);
		}
		this.setFilters = true;
	});

	hasColumnFilters = computed(() => {
		return this.headerFilters().some(
			({ filter }) => filter?.mode !== 'menu'
		);
	});

	readonly rows = input<
		Array<TableRow<T>>,
		Array<T> | PaginationState | null | undefined
	>([], {
		alias: 'data',
		transform: (
			v: Array<T> | PaginationState | null | undefined
		): Array<TableRow<T>> => {
			if (!v) return [];

			const items = Array.isArray(v) ? v : ((v.data as Array<T>) ?? []);

			if (!Array.isArray(v)) {
				this.page.set(v.page);
				this.perPage.set(v.perPage);
				this.totalItems.set(v.totalItems);
			}

			return items.map((item) => this.transformIntoRow(item));
		}
	});

	rowsEffect = effect(() => {
		const rows = this.rows();
		this.markSelected();
	});

	setFilters: boolean = true;

	transformIntoRow(data: T): TableRow<T> {
		return {
			selected: false,
			collapsed: true,
			data
		};
	}

	readonly perPageOptions = input<Array<number>>([20, 50, 100]);
	readonly page = model<number | null>(null);
	readonly perPage = model<number | null>(null);
	readonly totalItems = model<number | null>(null);

	readonly numberOfPages = computed((): number | null => {
		if (this.perPage() && this.totalItems()) {
			return Math.ceil(this.totalItems()! / this.perPage()!);
		}
		return null;
	});

	readonly ordination = model<PaginableTableOrdination>();

	/**
	 * Set if the data must be paginated
	 *
	 * @type {boolean}
	 * @memberof PaginableTableComponent
	 */
	readonly paginate = input<boolean>(true);

	/**
	 * If set, it will be the property returned in the selected event
	 *
	 * @type {string}
	 * @memberof PaginableTableComponent
	 */
	readonly bindValue = input<string>();

	readonly loading = model<boolean>(false);

	readonly paginationPosition = input<'bottom' | 'top' | 'both'>('bottom');

	readonly paginationInfo = input<boolean>(true);

	readonly stickyActions = input<boolean>(false);

	readonly batchActions = input<
		Array<PaginableTableDropdown | BatchTableButton>,
		Array<PaginableTableDropdown | BatchTableButton>
	>([], {
		transform: (
			value: Array<PaginableTableDropdown | BatchTableButton>
		) => {
			return value.map((item) => {
				if ((item as PaginableTableDropdown).buttons) {
					item = {
						fill: null,
						position: 'start',
						color: 'light',
						...item
					};
				}
				return item;
			});
		}
	});

	readonly selectable = input<boolean>(false);

	/**
	 * Set whether the selectable can be multiple
	 *
	 * @type {boolean}
	 * @memberof PaginableTableComponent
	 */
	readonly multiple = input<boolean>(false);

	/**
	 * Set whether the rows are selectable
	 *
	 * @type {boolean}
	 * @memberof PaginableTableComponent
	 */
	readonly searchable = input<boolean>(true);

	readonly searchTerm = model<string>('');

	searchProxy$ = new BehaviorSubject<string>(this.searchTerm());

	searchTermEffect = effect(() => {
		const delay = this.debounce();
		// console.log('delay');

		const sub = this.searchProxy$
			.pipe(debounceTime(delay), distinctUntilChanged())
			.subscribe((value) => {
				// console.log('subscribe');
				this.searchTerm.set(value);
			});

		// Inicializar el proxy con el valor actual
		this.searchProxy$.next(this.searchTerm());

		return () => {
			return sub.unsubscribe();
		};
	});

	readonly searchFn = input<(a: T, b: T) => boolean>();

	// TODO: Implementar
	readonly compareFn = input<(a: T, b: T) => boolean>();

	/**
	 * On item click event emitter
	 *
	 * @memberof PaginableTableComponent
	 */
	readonly clickFn =
		input<(event: TableRowClickEvent<T>) => void | Promise<void>>();

	readonly responsive = input<TableBreakpoint | null>(null);

	responsiveCSSClass = computed(() => {
		const response = this.responsive();
		if (response && Object.keys(TableBreakpoint).includes(response)) {
			return response === TableBreakpoint.ExtraSmall
				? null
				: 'table-responsive-' + this.responsive;
		}
		return null;
	});

	disabled: boolean = false;

	readonly templateRow = contentChild(PaginableTableRowDirective, {
		read: TemplateRef
	});
	readonly headerTpts = contentChildren(PaginableTableHeaderDirective);
	readonly templateCells = contentChildren(PaginableTableCellDirective);
	readonly noDataTpt = contentChild(PaginableTableNotFoundDirective, {
		read: TemplateRef
	});
	readonly loadingTpt = contentChild(PaginableTableLoadingDirective, {
		read: TemplateRef
	});
	readonly errorTpt = contentChild(PaginableTableErrorDirective, {
		read: TemplateRef
	});
	readonly templateExpandingRows = contentChildren(
		PaginableTableExpandingRowDirective
	);
	readonly filterTpts = contentChildren(PaginableTableFilterDirective);

	readonly dropdownComponents = viewChildren(DropdownComponent);

	writeValue(value: any): void {
		if (value) {
			this.value = Array.isArray(value) ? value : [value];
		} else {
			this.value = [];
		}
		this.markSelected();
	}

	onChange = (_: any) => {};
	onTouch = () => {};

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	/**
	 * Handles click events by extracting specific properties and passing them to a callback function.
	 *
	 * @param  - The `onItemClick` function takes in the following parameters: collapsed, selected and item.
	 * @param {number} depth - The `depth` parameter in the `onItemClick` function represents the depth level of the item being
	 * clicked. It is a number that indicates how deep the item is nested within a hierarchical structure.
	 * @param {number} index - The `index` parameter in the `onItemClick` function represents the position of the item that was clicked
	 * within a list or array. It is a number that indicates the index of the clicked item.
	 *
	 * @returns If the `clickFn` property is not defined in the current context, the `onItemClick` function will return without
	 * executing any further code.
	 */
	onItemClick(event: MouseEvent, item: TableRow) {
		const clickFn = this.clickFn();
		if (!clickFn) {
			return;
		}
		clickFn({ ...item, event });
	}

	/**
	 * If paging is done on the server, a parameter change subscription is launched. Otherwise,
	 * get the data sorted according to the header passed by parameter.
	 *
	 * @param {PaginableTableHeader} header
	 * @returns {void}
	 * @memberof PaginableTableComponent
	 */
	sort(header: PaginableTableHeader): void {
		if (!header.sortable) {
			return;
		}
		if (
			!this.ordination() ||
			this.ordination()?.property !== header.property
		) {
			this.ordination.set({
				property: header.property as any,
				direction: 'ASC'
			});
		} else {
			this.ordination.set({
				property: header.property,
				direction:
					this.ordination()?.direction === 'ASC' ? 'DESC' : 'ASC'
			});
		}
	}

	/**
	 * Get the ordination class
	 *
	 * @param {PaginableTableHeader} header
	 * @returns
	 * @memberof PaginableTableComponent
	 */
	getOrdenationClass(
		header: PaginableTableHeader
	): 'fa-sort' | 'fa-sort-up' | 'fa-sort-down' {
		if (
			!this.ordination ||
			this.ordination()?.property !== header.property
		) {
			return 'fa-sort';
		}
		return this.ordination()?.direction.toUpperCase() === 'ASC'
			? 'fa-sort-up'
			: 'fa-sort-down';
	}

	/**
	 * If it exists, returns the header cell template for the header passed by parameter
	 *
	 * @param {(PaginableTableHeader)} header
	 * @returns {TemplateRef<PaginableTableCellDirective>}
	 * @memberof PaginableTableComponent
	 */
	getHeaderTemplate(header: PaginableTableHeader): TemplateRef<any> | null {
		const property = header instanceof String ? header : header.property;
		if (!property) {
			return null;
		}
		const directive = this.headerTpts().find((o) => {
			return o.header === property;
		});
		return directive ? directive.template : null;
	}

	/**
	 * If it exists, returns the cell template for the header passed by parameter
	 *
	 * @param {(PaginableTableHeader)} header
	 * @returns {TemplateRef<PaginableTableCellDirective>}
	 * @memberof PaginableTableComponent
	 */
	getCellTemplate(header: PaginableTableHeader): TemplateRef<any> | null {
		const property = header instanceof String ? header : header.property;
		if (!property) {
			return null;
		}
		const directive = this.templateCells().find((o) => {
			return o.header === property;
		});
		return directive ? directive['template'] : null;
	}

	/**
	 * If it exists, returns the filter template for the header passed by parameter
	 *
	 * @param {(PaginableTableHeader)} header
	 * @returns {TemplateRef<PaginableTableCellDirective>}
	 * @memberof PaginableTableComponent
	 */
	getFilterTemplate(
		header: PaginableTableHeader
	): TemplateRef<PaginableTableFilterDirective> | null {
		const property = header instanceof String ? header : header.property;
		if (!property) {
			return null;
		}
		const directive = this.filterTpts().find((o) => o.header === property);
		return directive ? directive.template : null;
	}

	/**
	 * Handles the action to execute
	 *
	 * @param {Function} handler
	 * @param {*} row
	 * @memberof PaginableTableComponent
	 */
	handleAction(
		event: Event,
		handler: (row: TableRow) => void,
		row: TableRow
	) {
		event.stopPropagation();
		handler(row);
	}

	/**
	 * Handles the action to be executed in a batch
	 *
	 * @param {BatchTableButton} button
	 * @memberof PaginableTableComponent
	 */
	handleBatchAction(button: BatchTableButton) {
		if (button.handler) {
			button.handler(this.value);
		}
	}

	// TODO: Hacer para todas las columnas
	isHidden(button: PaginableTableButton, row: TableRow): Observable<boolean> {
		if (typeof button.hidden === 'function') {
			const result = button.hidden(row);
			return isObservable(result)
				? (result as Observable<boolean>)
				: of(result);
		}
		return of(!!button.hidden);
	}

	/**
	 * Expand or unexpand an expanding row
	 *
	 * @param {TableRow} item
	 * @memberof PaginableTableComponent
	 */
	toggleExpandedRow(item: TableRow) {
		item.collapsed = !item.collapsed;
	}

	/**
	 * Select or unselect all page items
	 *
	 * @memberof PaginableTableComponent
	 */
	toggleAll() {
		this.allRowsSelected = !this.allRowsSelected;
		const rows = this.rows();
		if (!rows) {
			return;
		}
		for (const row of rows) {
			const bindValue = this.bindValue();
			const needle = bindValue
				? (row.data as Record<string, any>)[bindValue]
				: row.data;
			const index = this.value.indexOf(needle);
			if (index > -1 && !this.allRowsSelected) {
				this.value.splice(index, 1);
			} else if (index === -1 && this.allRowsSelected) {
				this.value.push(needle);
			}
			row.selected = this.allRowsSelected;
		}
		this.emitValue();
	}

	/**
	 * Select or unselect a row
	 *
	 * @param {*} row
	 * @memberof PaginableTableComponent
	 */
	toggle(row: TableRow<T>) {
		const rows = this.rows();
		if (!rows) {
			return;
		}

		const bindValue = this.bindValue();
		const needle = bindValue
			? (row.data as Record<string, any>)[bindValue]
			: row.data;

		const index = this.value.indexOf(needle);
		if (index > -1) {
			this.value.splice(index, 1);
			row.selected = false;
		} else {
			this.value.push(needle);
			row.selected = true;
		}

		if (!this.multiple()) {
			this.value = row.selected ? [needle] : [];
			rows.forEach((o) => {
				const needle = bindValue
					? (o.data as Record<string, any>)[bindValue]
					: o.data;
				o.selected = this.value.indexOf(needle) > -1;
			});
		} else {
			this.allRowsSelected = rows.every((o) => o.selected);
		}

		this.emitValue();
	}

	/**
	 * Select or deselect a row if it exists in the collection of selected items
	 *
	 * @memberof PaginableTableComponent
	 */
	markSelected() {
		const rows = this.rows();
		if (!rows?.length) {
			return;
		}

		const bindValue = this.bindValue();

		rows.forEach((row) => {
			const needle = bindValue ? row.data[bindValue] : row.data;
			row.selected = this._contains(this.value, needle);
		});
		this.allRowsSelected = rows.every((o) => o.selected);
	}

	/**
	 * Emite el valor de los items seleccionados
	 *
	 */
	emitValue() {
		this.onChange(this.multiple() ? this.value : this.value[0]);
	}

	/**
	 * Check if a needle exists in a list
	 *
	 * @private
	 * @param {T[]} items
	 * @param {*} needle
	 * @return {*}  {boolean}
	 * @memberof PaginableTableComponent
	 */
	// TODO: Move to utils file
	private _contains(items: T[], needle: T): boolean {
		if (typeof needle === 'object' && needle !== null) {
			return items.some(
				(o) => JSON.stringify(o) === JSON.stringify(needle)
			);
		}
		return items.indexOf(needle) > -1;
	}

	/**
	 * Initializes the filters form group by creating form controls for each header filter.
	 * Maps header filters to form controls using either the filter key or property name as the control name.
	 * The initial value for each control is set to null.
	 */
	initializeFilterFG() {
		Object.keys(this.filtersFG.controls).forEach((controlName) => {
			this.filtersFG.removeControl(controlName);
		});

		for (const { filter = null, property } of this.headerFilters()) {
			this.filtersFG.addControl(
				filter?.key || property,
				this.#fb.control(null)
			);
		}
		// NOTE: Evitamos que al saltar el cambio de filtros del formulario, se restablezcan los filtros.
		this.setFilters = false;
	}

	/**
	 * Clean the advanced filter form
	 *
	 * @memberof PaginableTableComponent
	 */
	clearFilters(): void {
		this.filtersFG.reset();
	}

	/**
	 * Closes all other dropdowns except the one with the specified id.
	 *
	 * @param {id} - The `onDropdownFilterOpened` function takes an object parameter `id`.
	 */
	onDropdownFilterOpened({ id }: { id: string }) {
		this.dropdownComponents()?.forEach((dropdown) => {
			if (dropdown.id !== id && dropdown.isOpened) {
				dropdown.closeDropdown();
			}
		});
	}
}
