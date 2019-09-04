import { Component, Input } from '@angular/core';
import { Pagination } from '../../table-sorter.component';

@Component({
	selector: 'nb-table-sorter-paginator',
	templateUrl: './nb-table-sorter-paginator.component.html',
	styleUrls: ['./nb-table-sorter-paginator.component.scss']
})
export class NbTableSorterPaginatorComponent {

	@Input() pagination: Pagination;

}
