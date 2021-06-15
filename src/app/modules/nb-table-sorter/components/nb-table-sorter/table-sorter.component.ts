import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ContentChild, ContentChildren, EventEmitter, forwardRef, Input, OnDestroy, Output, QueryList, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, switchMap, tap } from 'rxjs/operators';
import { locale as enLang } from '../../assets/i18n/en';
import { locale as esLang } from '../../assets/i18n/es';
import { BREAKPOINTS } from '../../constants/breakpoints';
import { NbTableSorterCellDirective } from '../../directives/nb-table-sorter-cell.directive';
import { NbTableSorterErrorDirective } from '../../directives/nb-table-sorter-error.directive';
import { NbTableSorterExpandingRowDirective } from '../../directives/nb-table-sorter-expanding-row.directive';
import { NbTableSorterLoadingDirective } from '../../directives/nb-table-sorter-loading.directive';
import { NbTableSorterNotFoundDirective } from '../../directives/nb-table-sorter-not-found.directive';
import { NbTableSorterRowDirective } from '../../directives/nb-table-sorter-row.directive';
import { NbTableSorterButton } from '../../interfaces/nb-table-sorter-button';
import { NbTableSorterDropdown } from '../../interfaces/nb-table-sorter-dropdown';
import { NbTableSorterHeader } from '../../interfaces/nb-table-sorter-header';
import { NbTableSorterItem } from '../../interfaces/nb-table-sorter-item';
import { NbTableSorterOptions } from '../../interfaces/nb-table-sorter-options';
import { NbTableSorterOrdination } from '../../interfaces/nb-table-sorter-ordination';
import { NbTableSorterPagination } from '../../interfaces/nb-table-sorter-pagination';
import { NbTableSorterRowAction } from '../../interfaces/nb-table-sorter-row-action';
import { NbTableSorterService } from '../../services/nb-table-sorter.service';
import { PaginationService } from '../../services/pagination.service';
import { TranslationService } from '../../services/translation.service';

@Component({
	selector: 'table-sorter',
	templateUrl: './table-sorter.component.html',
	styleUrls: ['./table-sorter.component.scss'],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({ opacity: 0 }),
				animate('256ms 256ms', style({ opacity: 1, height: 'auto' })),
			]),
			transition(':leave', [
				animate('256ms ease-out', style({ opacity: 0, height: '0' })),
			])
		]),
	],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TableSorterComponent),
			multi: true
		}
	]
})
export class TableSorterComponent implements OnDestroy {
	private _headers: NbTableSorterHeader[] | string[];

	@Input() showSearchInput: boolean = true;
	@Input() options: NbTableSorterOptions = {
		cursor: 'default',
		hoverableRows: false
	};

	loading: boolean = false;
	errorOcurred: boolean = false;

	/**
	 * Table headers
	 *
	 * @readonly
	 * @type {(NbTableSorterHeader[] | string[])}
	 * @memberof TableSorterComponent
	 */
	@Input()
	get headers(): NbTableSorterHeader[] | string[] {
		if (!this._headers) {
			if (this._rows.length) {
				this._headers = Object.keys(this._rows[0]);
			} else {
				this._headers = [];
			}
		}
		return this._headers;
	}
	set headers(v: NbTableSorterHeader[] | string[]) {
		this._headers = v;
		this._initializeFilterForm();
	}

	data: NbTableSorterPagination;

	/**
	 * Items paginated
	 *
	 * @private
	 * @type {NbTableSorterPagination}
	 * @memberof TableSorterComponent
	 */
	private _pagination: NbTableSorterPagination;
	@Input()
	get pagination(): NbTableSorterPagination | Observable<NbTableSorterPagination> {
		return this._pagination;
	}
	set pagination(v: NbTableSorterPagination | Observable<NbTableSorterPagination>) {
		if (v.constructor.name === 'Observable') {
			this.loading = true;
			this.errorOcurred = false;
			this.data = null;

			(v as Observable<NbTableSorterPagination>).pipe(
				// tap(o => { throw new Error('asdf'); }),
				catchError((err, caught) => {
					this.errorOcurred = err;
					return of(null);
				}),
				tap(o => {
					this.loading = false;
				})
			).subscribe((result: NbTableSorterPagination) => {
				this.data = result;
			});
		} else {
			this.data = v as NbTableSorterPagination;
		}
		this.allRowsSelected = false;
		if (this.selectable || this.batchActions?.length) {
			this.markSelected();
		}
	}

	/**
	 * Items not paginated
	 *
	 * @private
	 * @type {any[]}
	 * @memberof TableSorterComponent
	 */
	private _rows: any[];
	@Input()
	get rows(): any[] {
		return this._rows;
	}
	set rows(v: any[]) {
		this._rows = v;
		const params = {
			page: 1,
			ordenation: this.ordenation,
			searchText: this.searchText,
			searchKeys: this.searchKeys,
			paginate: this.paginate
		};
		this.data = this.rows ? this._paginationSvc.generate(this.rows, params) : null;
		this.allRowsSelected = false;
		if (this.selectable || this.batchActions?.length) {
			this.markSelected();
		}
	}

	/**
	 * Collection of selected rows
	 *
	 * @type {any[]}
	 * @memberof TableSorterComponent
	 */
	selectedItems: any[] = [];

	/**
	 * Set whether all page rows are selecteds
	 *
	 * @type {boolean}
	 * @memberof TableSorterComponent
	 */
	allRowsSelected: boolean = false;

	/**
	 * Set whether the rows are selectable
	 *
	 * @type {boolean}
	 * @memberof TableSorterComponent
	 */
	@Input() selectable: boolean = false;

	/**
	 * If set, it will be the property returned in the onSelected event
	 *
	 * @type {string}
	 * @memberof TableSorterComponent
	 */
	@Input() selectableProperty: string;

	/**
	 * Event triggered when a row or multiples rows are selected or unselected
	 *
	 * @memberof TableSorterComponent
	 */
	@Output() onSelected = new EventEmitter<any>();

	/**
	 * Pagination position
	 *
	 * @type {('bottom' | 'top' | 'both')}
	 * @memberof TableSorterComponent
	 */
	@Input() paginationPosition: 'bottom' | 'top' | 'both' = 'bottom';

	@Input() paginationInfo: boolean = true;

	searchText: string = '';
	@Input() searchKeys: string[] = ['name'];

	ordenation: NbTableSorterOrdination = null;

	/**
	 * Collection of actions for items
	 *
	 * @type {NbTableSorterRowAction[]}
	 * @memberof TableSorterComponent
	 */
	@Input() actions: NbTableSorterRowAction[] = [];

	/**
	 * Collection of actions for items
	 *
	 * @type {NbTableSorterRowAction[]}
	 * @memberof TableSorterComponent
	 */
	private _batchActions: Array<NbTableSorterDropdown | NbTableSorterButton> = [];
	@Input()
	get batchActions(): Array<NbTableSorterDropdown | NbTableSorterButton> {
		return this._batchActions;
	}
	set batchActions(v: Array<NbTableSorterDropdown | NbTableSorterButton>) {
		this._batchActions = v;
	}

	batchActionsDropdown: NbTableSorterDropdown;

	batchAction: NbTableSorterButton = null;

	/**
	 * Sets the action column to sticky
	 *
	 * @type {NbTableSorterRowAction[]}
	 * @memberof TableSorterComponent
	 */
	@Input() stickyActions: boolean = true;

	/**
	 * On item click event emitter
	 *
	 * @memberof TableSorterComponent
	 */
	@Output() itemClick = new EventEmitter<any>();

	/**
	 * On page click event emitter
	 *
	 * @memberof TableSorterComponent
	 */
	@Output() onPageClick = new EventEmitter<number>();

	/**
	 * On params change event emitter
	 *
	 * @memberof TableSorterComponent
	 */
	@Output() onParamsChange = new EventEmitter<any>();

	// TODO: Put default config
	mapping: any = this._configSvc.mapping;

	/**
	 * Rows per page options
	 *
	 * @private
	 * @type {number[]}
	 * @memberof TableSorterComponent
	 */
	private _perPageOptions: number[] = [10, 20, 50, 100];
	@Input()
	get perPageOptions(): number[] {
		return this._perPageOptions;
	}
	set perPageOptions(v: number[]) {
		this._perPageOptions = v;
		this.itemsPerPage = this._perPageOptions.length ? this._perPageOptions[0] : 20;
	}

	/**
	 * Items per page
	 *
	 * @private
	 * @type {number}
	 * @memberof TableSorterComponent
	 */
	private _itemsPerPage: number = 20;
	@Input()
	get itemsPerPage(): number {
		return this._itemsPerPage;
	}
	set itemsPerPage(v: number) {
		this._itemsPerPage = +v;
		this.data.currentPage = 1;
		this.triggerTheParamChanges();
	}

	responsiveCSSClass: string = '';
	private _responsive: string;
	@Input()
	get responsive(): string {
		return this._responsive;
	}
	set responsive(v: string) {
		this._responsive = v;
		if (this._responsive && BREAKPOINTS.indexOf(this._responsive) > -1) {
			this.responsiveCSSClass = this.responsive === 'xs' ? null : ('table-responsive-' + this.responsive);
		} else {
			this.responsiveCSSClass = null;
		}
	}

	filterHeaders: NbTableSorterHeader[];

	/**
	 * Filter form
	 *
	 * @type {FormGroup}
	 * @memberof TableSorterComponent
	 */
	filterFG: FormGroup = new FormGroup({});

	/**
	 * Event triggered when a filter value changes
	 *
	 * @memberof TableSorterComponent
	 */
	@Output() filterChange = new EventEmitter<any>();

	filterFGSct: Subscription;

	/**
	 * Time to ouput the filter form value
	 *
	 * @type {number}
	 * @memberof TableSorterComponent
	 */
	@Input() debounce: number = 1024;

	disabled: boolean = false;

	/**
	 * Set if the data must be paginated
	 *
	 * @type {boolean}
	 * @memberof TableSorterComponent
	 */
	@Input() paginate: boolean = true;

	@ContentChild(NbTableSorterRowDirective, { read: TemplateRef }) templateRow: NbTableSorterRowDirective;
	@ContentChildren(NbTableSorterCellDirective) templateCells !: QueryList<NbTableSorterCellDirective>;
	@ContentChild(NbTableSorterNotFoundDirective, { read: TemplateRef }) templateNotFound: NbTableSorterNotFoundDirective;
	@ContentChild(NbTableSorterLoadingDirective, { read: TemplateRef }) loadingTpt: NbTableSorterLoadingDirective;
	@ContentChild(NbTableSorterErrorDirective, { read: TemplateRef }) errorTpt: NbTableSorterErrorDirective;
	@ContentChildren(NbTableSorterExpandingRowDirective) templateExpandingRows !: QueryList<NbTableSorterExpandingRowDirective>;

	constructor(
		private _fb: FormBuilder,
		private _paginationSvc: PaginationService,
		private _configSvc: NbTableSorterService,
		private _translationSvc: TranslationService,
	) {
		this._translationSvc.loadTranslations(enLang, esLang);
	}

	ngOnDestroy(): void {
		this.filterFGSct?.unsubscribe();
	}

	writeValue(value: any): void {
		if (value) {
			this.selectedItems = value || [];
		} else {
			this.selectedItems = [];
		}
	}

	onChange = (_: any) => { }
	onTouch = () => { }

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
	 * Obtiene la propiedad del objeto cuya clave es pasada por parámetro
	 *
	 * @param {object} item
	 * @param {string} key
	 * @returns {*}
	 * @memberof TableSorterComponent
	 */
	getProperty(item: object, key: string): any {
		return _.get(item, key);
	}

	itemClicked(item: any) {
		this.itemClick.next(item);
	}

	filter() {
		this.data.currentPage = 1;
		this.triggerTheParamChanges();
	}

	pageClicked(page: number) {
		this.data.currentPage = page;
		this.triggerTheParamChanges();
	}

	/**
	 * If paging is done on the server, a parameter change subscription is launched. Otherwise,
	 * get the data sorted according to the header passed by parameter.
	 *
	 * @param {NbTableSorterHeader} header
	 * @returns {void}
	 * @memberof TableSorterComponent
	 */
	sort(header: NbTableSorterHeader): void {
		if (!header.sortable) {
			return;
		}
		if (!this.ordenation || this.ordenation.property !== header.property) {
			this.ordenation = {
				property: header.property,
				direction: 'ASC'
			};
		} else {
			this.ordenation = {
				property: header.property,
				direction: this.ordenation.direction === 'ASC' ? 'DESC' : 'ASC'
			};
		}

		this.triggerTheParamChanges();
	}

	triggerTheParamChanges() {
		const params = {
			page: this.data.currentPage,
			perPage: this.itemsPerPage,
			ordenation: this.ordenation,
			searchText: this.searchText,
			searchKeys: this.searchKeys,
			paginate: this.paginate
		};

		Object.keys(params).forEach((k) => (params[k] == null) && delete params[k]);

		if (!this.rows) {
			this.onParamsChange.next(params);
		} else {
			this.data = this._paginationSvc.generate(this.rows, params);
		}
	}

	/**
	 * Get the ordination class
	 *
	 * @param {NbTableSorterHeader} header
	 * @returns
	 * @memberof TableSorterComponent
	 */
	getOrdenationClass(header: NbTableSorterHeader) {
		if (!this.ordenation || this.ordenation.property !== header.property) {
			return 'fa-sort';
		}
		return this.ordenation.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
	}

	/**
	 * If it exists, returns the cell template for the header passed by parameter
	 *
	 * @param {(NbTableSorterHeader)} header
	 * @returns {TemplateRef<NbTableSorterCellDirective>}
	 * @memberof TableSorterComponent
	 */
	getCellTemplate(header: NbTableSorterHeader): TemplateRef<NbTableSorterCellDirective> {
		const property = header instanceof String ? header : header.property;
		if (!property) {
			return null;
		}
		const directive = this.templateCells.find(o => o.header === property);
		return directive ? directive.template : null;
	}

	/**
	 * Handles the action to execute
	 *
	 * @param {Function} handler
	 * @param {*} item
	 * @memberof TableSorterComponent
	 */
	handleAction(event: Event, handler: (...args: any) => void, item: any) {
		event.stopPropagation();
		handler(item);
	}

	/**
	 * Handles the action to be executed in a batch
	 *
	 * @param {Event} event
	 * @memberof TableSorterComponent
	 */
	handleBatchAction(event: any) {
		event.handler(this.selectedItems);
	}

	/**
	 * Determines whether to display the batch actions menu
	 *
	 * @type {boolean}
	 * @memberof TableSorterComponent
	 */
	batchActionsShown: boolean = false;

	/**
	 * Expand or unexpand an expanding row
	 *
	 * @param {NbTableSorterItem} item
	 * @memberof TableSorterComponent
	 */
	toggleExpandedRow(item: NbTableSorterItem) {
		item.unfold = !item.unfold;
	}

	/**
	 * Select or unselect all page items
	 *
	 * @memberof TableSorterComponent
	 */
	toggleAll() {
		this.allRowsSelected = !this.allRowsSelected;
		this.data[this.mapping.data].forEach(o => {
			const needle = this.selectableProperty ? o[this.selectableProperty] : o;
			const index = this.selectedItems.indexOf(needle);
			if (index > -1 && !this.allRowsSelected) {
				this.selectedItems.splice(index, 1);
			} else if (index === -1 && this.allRowsSelected) {
				this.selectedItems.push(needle);
			}
			o.selected = this.allRowsSelected;
		});
		this.onSelected.emit(this.selectedItems);
		this.onChange(this.selectedItems);
	}

	/**
	 * Select or unselect a row
	 *
	 * @param {*} item
	 * @memberof TableSorterComponent
	 */
	toggle(item: any) {
		const needle = this.selectableProperty ? item[this.selectableProperty] : item;
		const index = this.selectedItems.indexOf(needle);
		if (index > -1) {
			this.selectedItems.splice(index, 1);
			item.selected = false;
		} else {
			this.selectedItems.push(needle);
			item.selected = true;
		}

		this.allRowsSelected = this.data[this.mapping.data].every(o => o.selected);
		this.onSelected.emit(this.selectedItems);
		this.onChange(this.selectedItems);
	}

	/**
	 * Select or deselect a row if it exists in the collection of selected items
	 *
	 * @memberof TableSorterComponent
	 */
	markSelected() {
		if (!this.data?.[this.mapping.data]?.length) {
			return;
		}
		this.data[this.mapping.data].forEach(o => {
			const needle = this.selectableProperty ? o[this.selectableProperty] : o;
			o.selected = this._contains(this.selectedItems, needle);
		});
		this.allRowsSelected = this.data[this.mapping.data].every(o => o.selected);
	}

	/**
	 * Check if a needle exists in a list
	 *
	 * @private
	 * @param {any[]} list
	 * @param {*} needle
	 * @return {*}  {boolean}
	 * @memberof TableSorterComponent
	 */
	private _contains(list: any[], needle: any): boolean {

		if (typeof needle === 'object' && needle !== null) {

			list = list.map(o => {
				const { selected, ...clone } = o;
				return clone;
			});

			const { selected, ...p } = needle;
			return list.some(o => JSON.stringify(o) === JSON.stringify(p));
		}
		return list.indexOf(needle) > -1;
	}

	/**
	 * Initializes the filtering form and its subscription
	 *
	 * @memberof TableSorterComponent
	 */
	_initializeFilterForm(): void {
		this.filterFGSct?.unsubscribe();
		const specificSearchFG = this._fb.group({});

		this.filterHeaders = (this._headers as NbTableSorterHeader[]).filter(h => typeof h === 'object' && h.filter);
		this.filterHeaders.forEach(h => {
			specificSearchFG.addControl(h.property, new FormControl(null));
		});

		this.filterFG = this._fb.group({
			searchText: [],
			specificSearch: specificSearchFG
		});

		this.filterFGSct = this.filterFG.valueChanges.pipe(
			debounceTime(this.debounce),
			tap(o => {
				console.log(this.filterFG.value);
				this.filterChange.emit(this.filterFG.value)
			})
		).subscribe();
	}
}
