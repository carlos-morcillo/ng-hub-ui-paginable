import { Component, OnInit } from '@angular/core';
import { TableSorterPagination } from '../../../modules/nb-table-sorter/table-sorter.component';
import { NbTableSorterHeader } from '../../../modules/nb-table-sorter/nb-table-sorter-header';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'app-server-pagination',
	templateUrl: './server-pagination.component.html',
	styleUrls: ['./server-pagination.component.scss']
})
export class ServerPaginationComponent implements OnInit {

	pagination: TableSorterPagination;
	headers: (NbTableSorterHeader | string)[] = [
		'id',
		'username',
		'email',
		'name'
	];
	searchKeys: string[] = ['id', 'username', 'email', 'name'];

	constructor(
		private _mockedUsersSvc: MockedUsersService
	) { }

	ngOnInit() {
		this.fetch();
	}

	async fetch(event: any = {}) {
		try {
			event.searchKeys = this.searchKeys;
			this.pagination = this._mockedUsersSvc.get(event);
		} catch (error) {
			console.error(error);
		}
	}

}
