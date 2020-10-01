import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NbTableSorterService } from '../../services/nb-table-sorter.service';
import { NbTableSorterPagination } from '../../interfaces/nb-table-sorter-pagination';

@Component({
	selector: 'nb-table-sorter-paginator',
	templateUrl: './nb-table-sorter-paginator.component.html',
	styleUrls: ['./nb-table-sorter-paginator.component.scss']
})
export class NbTableSorterPaginatorComponent {

	@Input() pagination: NbTableSorterPagination;
	@Output() onPageClick = new EventEmitter<number>();

	mapping: any = this._configSvc.mapping;

	get currentPage(): number {
		return this.pagination[this.mapping.currentPage] || this.pagination.currentPage
	}

	get lastPage(): number {
		return this.pagination[this.mapping.lastPage] || this.pagination.lastPage
	}

	constructor(
		private _configSvc: NbTableSorterService
	) { }

	pageClick(page: number) {
		this.onPageClick.next(page);
	}
}
