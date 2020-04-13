import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableSorterPagination } from '../../table-sorter.component';
import { NbTableSorterService } from '../../services/nb-table-sorter.service';

@Component({
	selector: 'nb-table-sorter-paginator',
	templateUrl: './nb-table-sorter-paginator.component.html',
	styleUrls: ['./nb-table-sorter-paginator.component.scss']
})
export class NbTableSorterPaginatorComponent {

	@Input() pagination: TableSorterPagination;
	@Output() onPageClick = new EventEmitter<number>();

	mapping: any = this._configSvc.mapping;

	constructor(
		private _configSvc: NbTableSorterService
	) { }

	pageClick(page: number) {
		this.onPageClick.next(page);
	}
}
