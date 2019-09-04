import { AfterContentInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import * as _ from 'lodash';
import { NbTableSorterHeader } from './nb-table-sorter-header';
import { NbTableSorterNotFoundDirective } from './nb-table-sorter-not-found.directive';
import { NbTableSorterRowDirective } from './nb-table-sorter-row.directive';

export class Pagination {

	total: number;

	private _perPage: number = 10;
	get perPage(): number {
		return this._perPage;
	}
	set perPage(v: number) {
		this._perPage = v;
		this.currentPage = 1;
		this.lastPage = Math.ceil(this._data.length / this._perPage);
	}


	private _currentPage: number = 1;
	get currentPage(): number {
		return this._currentPage;
	}
	set currentPage(v: number) {
		this._currentPage = v;
		if (this.perPage) {
			if (this._data && this._data.length) {
				this.from = this.perPage * (this._currentPage - 1);
				this.to = this.from + this.perPage;
			} else {
				this.from = 0;
				this.to = 0;
			}
			this.prevPage = this.currentPage - 1 > 0 ? this.currentPage - 1 : null;
			this.nextPage = this.currentPage + 1 <= this.lastPage ? this.currentPage + 1 : null;
		} else {
			this.from = 0;
			this.to = this.total;
			this.prevPage = null;
			this.nextPage = null;
		}
		this.itemsToShow = this.data.slice(this.from, this.to);


	}
	prevPage: number;
	nextPage: number;
	lastPage: number;
	from: number = 1;
	to: number;

	private _data: any[];
	get data(): any[] {
		return this._data;
	}
	set data(v: any[]) {
		this._data = v;
		if (this._data) {
			this.total = this._data.length;
			this.lastPage = Math.ceil(this._data.length / this._perPage);
			this.currentPage = 1;
		}
	}
	itemsToShow;
	// get items(): any[] {
	// 	this.itemsToShow =  this.data.splice((this.currentPage - 1) * this.perPage, this.perPage);
	// }

	constructor(data: any[] = []) {
		this.data = data;
	}

	prev() {
		const prev = this.currentPage - 1;
		if (prev >= 0) {
			this.currentPage = prev;
		}
	}

	next() {
		const next = this.currentPage + 1;
		if (next <= this.lastPage) {
			this.currentPage = next;
		}
	}

	reset() {
		this.currentPage = 1;
	}
}

@Component({
	selector: 'table-sorter',
	templateUrl: './table-sorter.component.html',
	styleUrls: ['./table-sorter.component.scss']
})
export class TableSorterComponent implements OnInit, AfterContentInit {
	private _headers: NbTableSorterHeader[] | string[];

	@Input() showSearchInput: boolean = true;

	@Input() options: any;

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

	private _rows: any[];

	@Input()
	get rows(): any[] {
		return this._rows;
	}

	set rows(v: any[]) {
		this._rows = v;
		this.filter();
	}

	pagination = new Pagination();

	@Input() paginationPosition: 'bottom' | 'top' | 'both' = 'bottom';

	@Input() paginationInfo: boolean = false;

	private _limit: number = 10;
	@Input()
	get limit(): number {
		return this._limit;
	}

	set limit(v: number) {
		this._limit = v;
		this.pagination.perPage = this._limit;
	}

	searchText: string = '';

	get searchKeys(): string[] {
		return ['nombre'];
	}

	@ContentChild(NbTableSorterRowDirective, { read: TemplateRef }) templateRow: NbTableSorterRowDirective;
	@ContentChild(NbTableSorterNotFoundDirective, { read: TemplateRef }) templateNotFound: NbTableSorterNotFoundDirective;

	@Output() itemClick = new EventEmitter<any>();

	constructor() { }

	ngOnInit() {
	}

	ngAfterContentInit() {
	}

	filter() {
		const value = this.searchText.toLowerCase();

		let filtered = this.rows;

		if (value && value.trim() !== '') {
			filtered = this.rows.filter((item) => {
				return this.searchKeys.some(o => {
					return _.get(item, o).toLowerCase().indexOf(value) > -1;
				});
			});
		}
		this.pagination.data = filtered;
	}

	itemClicked(event: Event, item: any) {
		this.itemClick.next(item);
	}
}
