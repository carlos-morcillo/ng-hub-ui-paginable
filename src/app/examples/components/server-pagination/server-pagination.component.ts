import { Component, OnInit } from '@angular/core';
import { MockedUsersService } from '../../../mocked-users.service';
import { NbTableSorterPagination, NbTableSorterHeader } from '../../../modules/nb-table-sorter';

@Component({
	selector: 'app-server-pagination',
	templateUrl: './server-pagination.component.html',
	styleUrls: ['./server-pagination.component.scss']
})
export class ServerPaginationComponent implements OnInit {

	pagination: NbTableSorterPagination;
	headers: (NbTableSorterHeader | string)[] = [
		'id',
		'username',
		{
			title: 'email',
			property: 'email',
			align: 'end',
			sticky: 'end'
		},
		'name'
	];
	searchKeys: string[] = ['id', 'username', 'email', 'name'];
	batchActions = [
		{
			title: 'export',
			handler: (items) => this._export(items)
		}
	];

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

	private _export(items) {
		console.log('export', items);
		this.pagination = null;
		this.fetch();
	}
}
