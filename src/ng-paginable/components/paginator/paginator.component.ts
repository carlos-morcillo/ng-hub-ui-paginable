import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaginateService } from '../../services/paginate.service';
import { PaginableTablePagination } from '../../interfaces/paginable-table-pagination';

@Component({
	selector: 'paginable-table-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

	@Input() pagination: PaginableTablePagination;
	@Output() onPageClick = new EventEmitter<number>();

	mapping: any = this._configSvc.mapping;

	get currentPage(): number {
		return this.pagination[this.mapping.currentPage] || this.pagination.currentPage
	}

	get lastPage(): number {
		return this.pagination[this.mapping.lastPage] || this.pagination.lastPage
	}

	constructor(
		private _configSvc: PaginateService
	) { }

	pageClick(page: number) {
		this.onPageClick.next(page);
	}
}
