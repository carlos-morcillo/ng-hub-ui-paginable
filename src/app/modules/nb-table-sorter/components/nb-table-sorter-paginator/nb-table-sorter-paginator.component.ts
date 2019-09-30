import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableSorterPagination } from '../../table-sorter.component';

@Component({
	selector: 'nb-table-sorter-paginator',
	templateUrl: './nb-table-sorter-paginator.component.html',
	styleUrls: ['./nb-table-sorter-paginator.component.scss']
})
export class NbTableSorterPaginatorComponent {

	@Input() pagination: TableSorterPagination;
	@Output() onPageClick = new EventEmitter<number>();

	pageClick(page: number) {
		this.onPageClick.next(page);
	}
}
