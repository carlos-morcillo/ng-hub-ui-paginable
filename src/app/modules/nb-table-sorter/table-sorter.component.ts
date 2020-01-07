import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ContentChildren } from '@angular/core';
import * as _ from 'lodash';
import { NbTableSorterHeader } from './nb-table-sorter-header';
import { NbTableSorterNotFoundDirective } from './nb-table-sorter-not-found.directive';
import { NbTableSorterRowDirective } from './nb-table-sorter-row.directive';
import { PaginationService } from './services/pagination.service';
import { NbTableSorterRowAction } from './nb-table-sorter-row-action';
import { NbTableSorterCellDirective } from './nb-table-sorter-cell.directive';
import { QueryList } from '@angular/core';
import { isString } from 'util';

export interface TableSorterOptions {
	serverSidePagination?: boolean;
	cursor?: 'pointer' | 'default';
}

export interface TableSorterPagination {
	current_page: number;
	first_page_url?: string;
	from: number;
	last_page: number;
	last_page_url?: string;
	next_page_url?: string;
	path?: string;
	per_page: number;
	prev_page_url?: any;
	to: number;
	total: number;
	data?: any[];
}

export interface TableSorterOrdination {
	property: string;
	direction: string;
}

@Component({
	selector: 'table-sorter',
	templateUrl: './table-sorter.component.html',
	styleUrls: ['./table-sorter.component.scss']
})
export class TableSorterComponent implements OnInit {
	private _headers: NbTableSorterHeader[] | string[];

	@Input() showSearchInput: boolean = true;
	@Input() options: TableSorterOptions = {
		cursor: 'default'
	};
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

	// private _pagination: TableSorterPagination;
	@Input() pagination: TableSorterPagination;
	// @Output() paginationValue = new EventEmitter<TableSorterPagination>();

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
			searchKeys: this.searchKeys
		};
		this.pagination = this.rows ? this._paginationSvc.generate(this.rows, params) : null;
	}

	@Input() paginationPosition: 'bottom' | 'top' | 'both' = 'bottom';

	@Input() paginationInfo: boolean = false;

	searchText: string = '';
	@Input() searchKeys: string[] = ['name'];

	ordenation: TableSorterOrdination = null;

	@Input() actions: NbTableSorterRowAction[] = [];

	@ContentChild(NbTableSorterRowDirective, { read: TemplateRef, static: false }) templateRow: NbTableSorterRowDirective;
	@ContentChildren(NbTableSorterCellDirective) templateCells !: QueryList<NbTableSorterCellDirective>;
	@ContentChild(NbTableSorterNotFoundDirective, { read: TemplateRef, static: false }) templateNotFound: NbTableSorterNotFoundDirective;

	@Output() itemClick = new EventEmitter<any>();
	@Output() onPageClick = new EventEmitter<number>();
	@Output() onParamsChange = new EventEmitter<any>();

	constructor(
		private _paginationSvc: PaginationService
	) { }

	ngOnInit(): void { }

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
		const params = {
			page: 1,
			ordenation: this.ordenation,
			searchText: this.searchText,
			searchKeys: this.searchKeys
		};
		if (!this.rows) {
			this.onParamsChange.next(params);
		} else {
			this.pagination = this._paginationSvc.generate(this.rows, params);
		}
	}

	pageClicked(page: number) {
		const params = {
			page,
			ordenation: this.ordenation,
			searchText: this.searchText,
			searchKeys: this.searchKeys
		};
		if (!this.rows) {
			this.onParamsChange.next(params);
		} else {
			this.pagination.current_page = page;
			this.pagination = this._paginationSvc.generate(this.rows, params);
		}
	}

	sort(header: NbTableSorterHeader) {
		if (!header.sortable) {
			return;
		}
		if (!this.ordenation || this.ordenation.property !== header.property) {
			this.ordenation = {
				property: header.property,
				direction: 'asc'
			};
		} else {
			this.ordenation = {
				property: header.property,
				direction: this.ordenation.direction === 'asc' ? 'desc' : 'asc'
			};
		}

		const params = {
			page: this.pagination.current_page,
			ordenation: this.ordenation,
			searchText: this.searchText,
			searchKeys: this.searchKeys
		};

		if (!this.rows) {
			this.onParamsChange.next(params);
		} else {
			this.pagination = this._paginationSvc.generate(this.rows, params);
		}
	}

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
		const property = isString(header) ? header : header.property;
		if (!property) {
			return null;
		}
		const directive = this.templateCells.find(o => o.header === property);
		return directive ? directive.template : null;
	}

	/**
	 * Handle the action to execute
	 *
	 * @param {Function} handler
	 * @param {*} item
	 * @memberof TableSorterComponent
	 */
	handleAction(event: Event, handler: (...args: any) => void, item: any) {
		event.stopPropagation();
		handler(item);
	}
}
