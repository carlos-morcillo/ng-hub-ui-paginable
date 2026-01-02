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
import { FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { GetPipe, IsObservablePipe, TranslatePipe, UcfirstPipe, UnwrapAsyncPipe } from 'ng-hub-ui-utils';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, isObservable, of } from 'rxjs';
import { TableBreakpoint } from '../../constants/breakpoints';
import { PaginableTableCellDirective } from '../../directives/paginable-table-cell.directive';
import { PaginableTableErrorDirective } from '../../directives/paginable-table-error.directive';
import { PaginableTableExpandingRowDirective } from '../../directives/paginable-table-expanding-row.directive';
import { PaginableTableFilterDirective } from '../../directives/paginable-table-filter.directive';
import { PaginableTableHeaderDirective } from '../../directives/paginable-table-header.directive';
import { PaginableTableLoadingDirective } from '../../directives/paginable-table-loading.directive';
import { PaginableTableNotFoundDirective } from '../../directives/paginable-table-not-found.directive';
import { PaginableTableRowDirective } from '../../directives/paginable-table-row.directive';
import { ListButton, RowButton, TableRowEvent } from '../../interfaces';
import { PaginableTableDropdown } from '../../interfaces/paginable-table-dropdown';
import { PaginableTableHeader } from '../../interfaces/paginable-table-header';
import { PaginableTableOptions } from '../../interfaces/paginable-table-options';
import { PaginableTableOrdination } from '../../interfaces/paginable-table-ordination';
import { PaginationState } from '../../interfaces/pagination-state';
import { TableRow } from '../../interfaces/table-row';
import { debouncedSignal, generateUniqueId } from '../../utils';
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
			transition(':enter', [style({ opacity: 0 }), animate('256ms 256ms', style({ opacity: 1, height: 'auto' }))]),
			transition(':leave', [animate('256ms ease-out', style({ opacity: 0, height: '0' }))])
		])
	],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TableComponent),
			multi: true
		}
	],
	host: {
		class: 'hub-table'
	}
})
/**
 * A highly configurable and feature-rich table component for Angular applications.
 * Provides data visualization with pagination, sorting, filtering, and selection capabilities.
 *
 * Features:
 * - Pagination (local and remote)
 * - Column sorting with customizable sort functions
 * - Advanced filtering with column-specific filters
 * - Row selection (single and multiple)
 * - Expandable rows
 * - Custom templates for headers, cells, and special states
 * - Responsive design with configurable breakpoints
 * - Batch actions for selected rows
 * - Search functionality with debouncing
 * - Loading and error states
 * - Accessibility features
 *
 * @template T The type of data objects displayed in the table
 * @example
 * ```html
 * <hub-ui-table
 *   [headers]="headers"
 *   [data]="data()"
 *   [(page)]="page"
 *   [totalItems]="totalItems"
 *   [loading]="loading"
 *   [searchable]="true"
 *   [selectable]="true"
 *   [(searchTerm)]="searchTerm"
 *   [(ordination)]="ordination">
 * </hub-ui-table>
 * ```
 */
export class TableComponent<T = any> {
	/** Form builder service for creating reactive forms */
	#fb = inject(UntypedFormBuilder);

	/** Unique identifier for the table component instance */
	id = input(generateUniqueId(16));

	/** Visual and behavioral options for the table */
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

	/** Column headers configuration. Can be strings for simple headers or PaginableTableHeader objects for advanced features */
	readonly headers = model<Array<PaginableTableHeader | string>>([]);

	/** Computed headers with normalized configuration and automatic button column handling */
	readonly fixedHeaders = computed(() => {
		const headers = this.headers();
		const fixedHeaders: Array<PaginableTableHeader> = headers.map((header) => {
			if (typeof header === 'string') {
				return {
					title: header,
					property: header
				};
			}
			return header;
		});

		// Parsing headers
		for (const header of fixedHeaders) {
			if (header.constructor.name === 'Object' && header.buttons && !header.property) {
				Object.assign(header, { wrapping: 'nowrap', onlyButtons: true, align: 'end' }, header);
			}
		}
		return fixedHeaders;
	});

	/** Computed total number of columns including selection and expansion columns */
	headersCount = computed(() => {
		let count = this.fixedHeaders().filter((header) => {
			if (typeof header.hidden === 'function') {
				const result = header.hidden();
				if (result instanceof Promise || isObservable(result)) {
					return false;
				}
				return !result;
			}
			return !header.hidden;
		}).length;
		if ((this.selectable() && this.multiple()) || this.batchActions().length) {
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

	/** Computed list of headers that have filter configurations */
	headerFilters = computed(() => {
		const headerFilters = this.fixedHeaders().filter((header) => header.filter);
		setTimeout(() => this.initializeFilterFG());
		return headerFilters;
	});

	/** Model for filter values applied to the table columns */
	readonly filters = model<Record<string, {}> | null>({});

	/**
	 * Filter form
	 *
	 * @type {FormGroup}
	 * @memberof PaginableTableComponent
	 */
	filtersFG: FormGroup = new FormGroup({});

	/** Indicates if filters are currently being applied or processed */
	filterLoading: boolean = false;

	/** Effect that synchronizes external filter changes with the internal form */
	filterEffect = effect(() => {
		const filters = this.filters();

		// Le damos un poco de tiempo para
		setTimeout(() => {
			this.filtersFG.patchValue(filters ?? {}, { emitEvent: false });
		}, 16);
	});

	/** Debounced signal for filter form changes to prevent excessive API calls */
	filtersChange = debouncedSignal(toSignal(this.filtersFG.valueChanges), this.debounce);

	/** Effect that handles filter form changes and updates the filters model */
	filtersFGChangeEffect = effect(() => {
		const filters = this.filtersChange();
		if (filters === undefined) return;

		if (this.setFilters) {
			this.filters.set(filters);
		}
		this.setFilters = true;
	});

	/** Computed boolean indicating if any column has inline filters (not menu filters) */
	hasColumnFilters = computed(() => {
		return this.headerFilters().some(({ filter }) => filter?.mode !== 'menu');
	});

	/**
	 * Table data input that accepts either raw data array or PaginationState object.
	 * Automatically transforms data into TableRow format and handles pagination state.
	 * When PaginationState is provided, automatically sets page, perPage, and totalItems.
	 */
	readonly rows = input<Array<TableRow<T>>, Array<T> | PaginationState | null | undefined>([], {
		alias: 'data',
		transform: (v: Array<T> | PaginationState | null | undefined): Array<TableRow<T>> => {
			if (!v) return [];

			const items = Array.isArray(v) ? v : (v.data as Array<T>) ?? [];

			if (!Array.isArray(v)) {
				this.page.set(v.page);
				this.perPage.set(v.perPage);
				this.totalItems.set(v.totalItems);
			}

			return items.map((item) => this.transformIntoRow(item));
		}
	});

	/** Effect that runs when rows data changes to update selection state */
	rowsEffect = effect(() => {
		const rows = this.rows();
		this.markSelected();
	});

	/** Internal flag to prevent filter feedback loops during initialization */
	setFilters: boolean = true;

	/**
	 * Transforms raw data item into TableRow format with default selection and expansion state.
	 *
	 * @param data The raw data item to transform
	 * @returns TableRow with default collapsed and unselected state
	 */
	transformIntoRow(data: T): TableRow<T> {
		return {
			selected: false,
			collapsed: true,
			data
		};
	}

	/** Available options for number of items per page */
	readonly perPageOptions = input<Array<number>>([20, 50, 100]);
	/** Current page number (1-based) */
	readonly page = model<number | null>(null);
	/** Number of items to display per page */
	readonly perPage = model<number | null>(null);
	/** Total number of items available across all pages */
	readonly totalItems = model<number | null>(null);

	/** Computed total number of pages based on perPage and totalItems */
	readonly numberOfPages = computed((): number | null => {
		if (this.perPage() && this.totalItems()) {
			return Math.ceil(this.totalItems()! / this.perPage()!);
		}
		return null;
	});

	/** Current column sorting configuration */
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

	/** Loading state indicator for the table */
	readonly loading = model<boolean>(false);

	/** Position where pagination controls should be displayed */
	readonly paginationPosition = input<'bottom' | 'top' | 'both'>('bottom');

	/** Whether to show pagination information (e.g., "Showing 1 to 10 of 100 entries") */
	readonly paginationInfo = input<boolean>(true);

	/** Whether action buttons should stick to viewport during scrolling */
	readonly stickyActions = input<boolean>(false);

	/** Actions that can be performed on multiple selected rows */
	readonly batchActions = input<Array<PaginableTableDropdown | ListButton>, Array<PaginableTableDropdown | ListButton>>([], {
		transform: (value: Array<PaginableTableDropdown | ListButton>) => {
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

	/** Whether rows can be selected by clicking on them */
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
	/** Whether the table includes a search input field */
	readonly searchable = input<boolean>(true);

	/** Current search term for filtering table data */
	readonly searchTerm = model<string>('');

	/** Internal BehaviorSubject for debouncing search term changes */
	searchProxy$ = new BehaviorSubject<string>(this.searchTerm());

	/** Effect that handles debounced search term updates */
	searchTermEffect = effect(() => {
		const delay = this.debounce();

		const sub = this.searchProxy$.pipe(debounceTime(delay), distinctUntilChanged()).subscribe((value) => {
			this.searchTerm.set(value);
		});

		// Inicializar el proxy con el valor actual
		this.searchProxy$.next(this.searchTerm());

		return () => {
			return sub.unsubscribe();
		};
	});

	/** Custom search function for filtering table data */
	readonly searchFn = input<(a: T, b: T) => boolean>();

	/** Custom comparison function for row equality checks (TODO: Implement) */
	// TODO: Implementar
	readonly compareFn = input<(a: T, b: T) => boolean>();

	/**
	 * On item click event emitter
	 *
	 * @memberof PaginableTableComponent
	 */
	readonly clickFn = input<(event: TableRowEvent<T>) => void | Promise<void>>();

	/** Responsive breakpoint configuration for table layout */
	readonly responsive = input<TableBreakpoint | null>(null);

	/** Computed CSS class for responsive table behavior */
	responsiveCSSClass = computed(() => {
		const response = this.responsive();
		if (response && Object.keys(TableBreakpoint).includes(response)) {
			return response === TableBreakpoint.ExtraSmall ? null : 'table-responsive-' + this.responsive;
		}
		return null;
	});

	/** Disabled state for the entire table component */
	disabled: boolean = false;

	/** Custom template for table rows */
	readonly templateRow = contentChild(PaginableTableRowDirective, {
		read: TemplateRef
	});
	/** Collection of custom header templates */
	readonly headerTpts = contentChildren(PaginableTableHeaderDirective);
	/** Collection of custom cell templates for specific columns */
	readonly templateCells = contentChildren(PaginableTableCellDirective);
	/** Template to display when no data is available */
	readonly noDataTpt = contentChild(PaginableTableNotFoundDirective, {
		read: TemplateRef
	});
	/** Template to display during loading state */
	readonly loadingTpt = contentChild(PaginableTableLoadingDirective, {
		read: TemplateRef
	});
	/** Template to display during error state */
	readonly errorTpt = contentChild(PaginableTableErrorDirective, {
		read: TemplateRef
	});
	/** Collection of templates for expandable row content */
	readonly templateExpandingRows = contentChildren(PaginableTableExpandingRowDirective);
	/** Collection of custom filter templates for specific columns */
	readonly filterTpts = contentChildren(PaginableTableFilterDirective);

	/** Collection of dropdown components used in the table */
	readonly dropdownComponents = viewChildren(DropdownComponent);

	/**
	 * Implements ControlValueAccessor.writeValue()
	 * Sets the selected value(s) from external form controls or ngModel
	 *
	 * @param value The value to set (can be single item or array)
	 */
	writeValue(value: any): void {
		if (value) {
			this.value = Array.isArray(value) ? value : [value];
		} else {
			this.value = [];
		}
		this.markSelected();
	}

	/** ControlValueAccessor callback for value changes */
	onChange = (_: any) => {};
	/** ControlValueAccessor callback for touch events */
	onTouch = () => {};

	/**
	 * Implements ControlValueAccessor.registerOnChange()
	 * Registers callback function for value changes
	 *
	 * @param fn The callback function to register
	 */
	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	/**
	 * Implements ControlValueAccessor.registerOnTouched()
	 * Registers callback function for touch events
	 *
	 * @param fn The callback function to register
	 */
	registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	/**
	 * Implements ControlValueAccessor.setDisabledState()
	 * Sets the disabled state of the component
	 *
	 * @param isDisabled Whether the component should be disabled
	 */
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
	/**
	 * Handles click events on table rows.
	 * Executes the provided clickFn callback with row details and event information.
	 *
	 * @param event The mouse event that triggered the click
	 * @param item The table row that was clicked
	 * @returns void if no click function is defined
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
	/**
	 * Handles column sorting by updating the ordination state.
	 * Toggles between ASC and DESC directions, or sets initial ASC direction.
	 * Only processes sortable headers.
	 *
	 * @param header The header configuration for the column to sort
	 * @returns void if header is not sortable
	 */
	sort(header: PaginableTableHeader): void {
		if (!header.sortable) {
			return;
		}
		if (!this.ordination() || this.ordination()?.property !== header.property) {
			this.ordination.set({
				property: header.property as any,
				direction: 'ASC'
			});
		} else {
			this.ordination.set({
				property: header.property,
				direction: this.ordination()?.direction === 'ASC' ? 'DESC' : 'ASC'
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
	/**
	 * Determines the appropriate icon class for column sorting indicators.
	 * Returns different icons based on current sort state and direction.
	 *
	 * @param header The header configuration to check sort state for
	 * @returns BEM icon class name for sort icon
	 */
	getOrdenationClass(
		header: PaginableTableHeader
	): 'hub-table__icon--sort' | 'hub-table__icon--sort-up' | 'hub-table__icon--sort-down' {
		if (!this.ordination || this.ordination()?.property !== header.property) {
			return 'hub-table__icon--sort';
		}
		return this.ordination()?.direction.toUpperCase() === 'ASC' ? 'hub-table__icon--sort-up' : 'hub-table__icon--sort-down';
	}

	/**
	 * If it exists, returns the header cell template for the header passed by parameter
	 *
	 * @param {(PaginableTableHeader)} header
	 * @returns {TemplateRef<PaginableTableCellDirective>}
	 * @memberof PaginableTableComponent
	 */
	/**
	 * Retrieves a custom header template for the specified column.
	 * Searches through headerTpts collection for a matching template directive.
	 *
	 * @param header The header configuration to find template for
	 * @returns The template reference if found, null otherwise
	 */
	getHeaderTemplate(header: PaginableTableHeader): TemplateRef<any> | null {
		const property = header instanceof String ? header : header.property;
		if (!property) {
			return null;
		}
		const directive = this.headerTpts().find((o) => {
			return o.header() === property;
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
	/**
	 * Retrieves a custom cell template for the specified column.
	 * Searches through templateCells collection for a matching template directive.
	 *
	 * @param header The header configuration to find cell template for
	 * @returns The template reference if found, null otherwise
	 */
	getCellTemplate(header: PaginableTableHeader): TemplateRef<any> | null {
		const property = header instanceof String ? header : header.property;
		if (!property) {
			return null;
		}
		const directive = this.templateCells().find((o) => {
			return o.header() === property;
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
	/**
	 * Retrieves a custom filter template for the specified column.
	 * Searches through filterTpts collection for a matching template directive.
	 *
	 * @param header The header configuration to find filter template for
	 * @returns The filter template reference if found, null otherwise
	 */
	getFilterTemplate(header: PaginableTableHeader): TemplateRef<PaginableTableFilterDirective> | null {
		const property = header instanceof String ? header : header.property;
		if (!property) {
			return null;
		}
		const directive = this.filterTpts().find((o) => o.header() === property);
		return directive ? directive.template : null;
	}

	/**
	 * Handles the action to execute
	 *
	 * @param {Function} handler
	 * @param {*} row
	 * @memberof PaginableTableComponent
	 */
	/**
	 * Handles action button clicks within table rows.
	 * Prevents event bubbling and executes the provided handler function.
	 *
	 * @param event The click event to stop propagation for
	 * @param handler The action handler function to execute
	 * @param row The table row context for the action
	 */
	handleAction(event: Event, handler: (row: TableRow) => void, row: TableRow) {
		event.stopPropagation();
		handler(row);
	}

	/**
	 * Handles the action to be executed in a batch
	 *
	 * @param {ListButton} button
	 * @memberof PaginableTableComponent
	 */
	/**
	 * Handles batch action execution on selected rows.
	 * Executes the button's handler function with currently selected values.
	 *
	 * @param button The batch action button configuration with handler
	 */
	handleBatchAction(button: ListButton) {
		if (button.handler) {
			button.handler(this.value);
		}
	}

	/**
	 * Determines if a row button should be hidden based on its configuration.
	 * Handles both function and boolean hidden properties, returning Observable for consistency.
	 *
	 * @param button The button configuration to check visibility for
	 * @param row The table row context
	 * @returns Observable<boolean> indicating if button should be hidden
	 * @todo Implement this logic for all columns, not just buttons
	 */
	isHidden(button: RowButton, row: TableRow): Observable<boolean> {
		if (typeof button.hidden === 'function') {
			const result = button.hidden(row);
			return isObservable(result) ? (result as Observable<boolean>) : of(result);
		}
		return of(!!button.hidden);
	}

	/**
	 * Determines if a header column should be hidden based on its configuration.
	 * Handles boolean values, synchronous functions, and asynchronous functions (Promise/Observable).
	 *
	 * @param header The header configuration to check visibility for
	 * @returns Observable<boolean> indicating if column should be hidden
	 */
	isColumnHidden(header: PaginableTableHeader): Observable<boolean> {
		if (typeof header.hidden === 'function') {
			const result = header.hidden();
			if (isObservable(result)) {
				return result as Observable<boolean>;
			}
			if (result instanceof Promise) {
				return new Observable((subscriber) => {
					result
						.then((value) => {
							subscriber.next(value);
							subscriber.complete();
						})
						.catch((error) => {
							subscriber.error(error);
						});
				});
			}
			return of(result);
		}
		return of(!!header.hidden);
	}

	/**
	 * Expand or unexpand an expanding row
	 *
	 * @param {TableRow} item
	 * @memberof PaginableTableComponent
	 */
	/**
	 * Toggles the expanded/collapsed state of a table row.
	 * Used for rows that have expandable content.
	 *
	 * @param item The table row to toggle expansion state for
	 */
	toggleExpandedRow(item: TableRow) {
		item.collapsed = !item.collapsed;
	}

	/**
	 * Select or unselect all page items
	 *
	 * @memberof PaginableTableComponent
	 */
	/**
	 * Toggles selection state for all visible rows on the current page.
	 * Updates both individual row selection and the allRowsSelected flag.
	 * Respects the bindValue configuration for complex object selection.
	 */
	toggleAll() {
		this.allRowsSelected = !this.allRowsSelected;
		const rows = this.rows();
		if (!rows) {
			return;
		}
		for (const row of rows) {
			const bindValue = this.bindValue();
			const needle = bindValue ? (row.data as Record<string, any>)[bindValue] : row.data;
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
	/**
	 * Toggles selection state for a single table row.
	 * Handles both single and multiple selection modes.
	 * Updates the internal value array and emits changes via ControlValueAccessor.
	 *
	 * @param row The table row to toggle selection for
	 */
	toggle(row: TableRow<T>) {
		const rows = this.rows();
		if (!rows) {
			return;
		}

		const bindValue = this.bindValue();
		const needle = bindValue ? (row.data as Record<string, any>)[bindValue] : row.data;

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
				const needle = bindValue ? (o.data as Record<string, any>)[bindValue] : o.data;
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
	/**
	 * Updates the selection state of all rows based on the current value array.
	 * Called when the rows data changes or when external value changes occur.
	 * Respects the bindValue configuration for object property matching.
	 */
	markSelected() {
		const rows = this.rows();
		if (!rows?.length) {
			return;
		}

		const bindValue = this.bindValue();

		rows.forEach((row) => {
			const data: any = row.data as any;
			const needle = bindValue ? data[bindValue] : (data as any);
			row.selected = this._contains(this.value as any, needle as any);
		});
		this.allRowsSelected = rows.every((o) => o.selected);
	}

	/**
	 * Emits the current selection value through the ControlValueAccessor interface.
	 * Handles both single and multiple selection modes appropriately.
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
	/**
	 * Checks if a needle value exists within an items array.
	 * Handles both primitive and object comparisons using JSON serialization for objects.
	 *
	 * @param items The array to search within
	 * @param needle The value to search for
	 * @returns true if needle is found in items, false otherwise
	 * @todo Move this utility function to a shared utils file
	 */
	private _contains(items: T[], needle: T): boolean {
		if (typeof needle === 'object' && needle !== null) {
			return items.some((o) => JSON.stringify(o) === JSON.stringify(needle));
		}
		return items.indexOf(needle) > -1;
	}

	/**
	 * Initializes the filters form group by creating form controls for each header filter.
	 * Maps header filters to form controls using either the filter key or property name as the control name.
	 * The initial value for each control is set to null.
	 */
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
			this.filtersFG.addControl(filter?.key || property, this.#fb.control(null));
		}
		// NOTE: Evitamos que al saltar el cambio de filtros del formulario, se restablezcan los filtros.
		this.setFilters = false;
	}

	/**
	 * Clean the advanced filter form
	 *
	 * @memberof PaginableTableComponent
	 */
	/**
	 * Resets all filter form controls to their initial state.
	 * Clears all applied filters and returns the table to unfiltered state.
	 */
	clearFilters(): void {
		this.filtersFG.reset();
	}

	/**
	 * Closes all other dropdowns except the one with the specified id.
	 *
	 * @param {id} - The `onDropdownFilterOpened` function takes an object parameter `id`.
	 */
	/**
	 * Handles dropdown filter opening by closing all other dropdowns.
	 * Ensures only one dropdown filter is open at a time for better UX.
	 *
	 * @param id The unique identifier of the dropdown that was opened
	 */
	onDropdownFilterOpened({ id }: { id: string }) {
		this.dropdownComponents()?.forEach((dropdown) => {
			if (dropdown.id() !== id && dropdown.isOpened()) {
				dropdown.closeDropdown();
			}
		});
	}
}
