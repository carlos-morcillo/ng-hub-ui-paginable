import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ContentChildren, forwardRef } from '@angular/core';
import * as _ from 'lodash';
import { NbTableSorterHeader } from '../../interfaces/nb-table-sorter-header';
import { NbTableSorterNotFoundDirective } from '../../directives/nb-table-sorter-not-found.directive';
import { NbTableSorterRowDirective } from '../../directives/nb-table-sorter-row.directive';
import { PaginationService } from '../../services/pagination.service';
import { NbTableSorterRowAction } from '../../interfaces/nb-table-sorter-row-action';
import { NbTableSorterCellDirective } from '../../directives/nb-table-sorter-cell.directive';
import { QueryList } from '@angular/core';
import { isString } from 'util';
import { NbTableSorterService } from '../../services/nb-table-sorter.service';
import { NbTableSorterExpandingRowDirective } from '../../directives/nb-table-sorter-expanding-row.directive';
import { NbTableSorterOptions } from '../../interfaces/nb-table-sorter-options';
import { NbTableSorterPagination } from '../../interfaces/nb-table-sorter-pagination';
import { NbTableSorterOrdination } from '../../interfaces/nb-table-sorter-ordination';
import { NbTableSorterItem } from '../../interfaces/nb-table-sorter-item';
import { locale as enLang } from '../../assets/i18n/en';
import { locale as esLang } from '../../assets/i18n/es';
import { TranslationService } from '../../services/translation.service';
import { BREAKPOINTS } from '../../constants/breakpoints';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NbTableSorterButton } from '../../interfaces/nb-table-sorter-button';

@Component({
    selector: 'table-sorter',
    templateUrl: './table-sorter.component.html',
    styleUrls: ['./table-sorter.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TableSorterComponent),
            multi: true
        }
    ]
})
export class TableSorterComponent {
    private _headers: NbTableSorterHeader[] | string[];

    @Input() showSearchInput: boolean = true;
    @Input() options: NbTableSorterOptions = {
        cursor: 'default'
    };

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
    }

    /**
     * Items paginated
     *
     * @private
     * @type {NbTableSorterPagination}
     * @memberof TableSorterComponent
     */
    private _pagination: NbTableSorterPagination;
    @Input()
    get pagination(): NbTableSorterPagination {
        return this._pagination;
    }
    set pagination(v: NbTableSorterPagination) {
        this._unselectItems();
        this._pagination = v;
        this.allRowsSelected = false;
        if (this.selectable) {
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
        this.pagination = this.rows ? this._paginationSvc.generate(this.rows, params) : null;
        this.allRowsSelected = false;
        if (this.selectable) {
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
    @Input() batchActions: NbTableSorterButton[] = [];

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
            this.responsiveCSSClass = this.responsive === 'xs' ? 'table-responsive' : 'table-responsive-' + this.responsive;
        } else {
            this.responsiveCSSClass = '';
        }
    }

    disabled: boolean = false;

    onChange = (_: any) => { };
    onTouch = () => { };

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
    @ContentChildren(NbTableSorterExpandingRowDirective) templateExpandingRows !: QueryList<NbTableSorterExpandingRowDirective>;

    constructor(
        private _paginationSvc: PaginationService,
        private _configSvc: NbTableSorterService,
        private _translationSvc: TranslationService
    ) {
        this._translationSvc.loadTranslations(enLang, esLang);
    }

    writeValue(value: any): void {
        if (value) {
            this.selectedItems = value || [];
        } else {
            this.selectedItems = [];
        }
    }

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
        this.pagination.currentPage = 1;
        this.triggerTheParamChanges();
    }

    pageClicked(page: number) {
        this.pagination.currentPage = page;
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
            page: this.pagination.currentPage,
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
            this.pagination = this._paginationSvc.generate(this.rows, params);
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
        return this.ordenation.direction === 'ASC' ? 'fa-sort-up' : 'fa-sort-down';
    }

    /**
     * If it exists, returns the cell template for the header passed by parameter
     *
     * @param {(NbTableSorterHeader)} header
     * @returns {TemplateRef<NbTableSorterCellDirective>}
     * @memberof TableSorterComponent
     */
    getCellTemplate(header: NbTableSorterHeader): TemplateRef<NbTableSorterCellDirective> {
        const property = isString(header) ? header : header.property;
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
     * Hadles the action to be executed in a batch
     *
     * @param {Event} event
     * @memberof TableSorterComponent
     */
    handleBatchAction(event: Event) {
        event.stopPropagation();
        this.batchAction.handler(this.selectedItems);
    }

    toggledropdown(event: Event, header: NbTableSorterHeader, item: any) {
        console.log(arguments);
    }

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
        this.pagination[this.mapping.data].forEach(o => {
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

        this.allRowsSelected = this.pagination[this.mapping.data].every(o => o.selected);
        this.onSelected.emit(this.selectedItems);
        this.onChange(this.selectedItems);
    }

    /**
     * Select or deselect a row if it exists in the collection of selected items
     *
     * @memberof TableSorterComponent
     */
    markSelected() {
        if (!this.pagination?.[this.mapping.data]?.length) {
            return;
        }
        this.pagination[this.mapping.data].forEach(o => {
            const needle = this.selectableProperty ? o[this.selectableProperty] : o;
            // o.selected = this.selectedItems.indexOf(needle) > -1;
            o.selected = !!this.selectedItems.filter(item => _.isEqual(item, o)).length;
        });
        this.allRowsSelected = this.pagination[this.mapping.data].every(o => o.selected);
    }

    /**
     * Unselect items
     *
     * @memberof TableSorterComponent
     */
    private _unselectItems() {
        this.selectedItems = [];

        if (this.pagination) {
            this.pagination[this.mapping.data].forEach(o => o.selected = false);
        }
    }
}
