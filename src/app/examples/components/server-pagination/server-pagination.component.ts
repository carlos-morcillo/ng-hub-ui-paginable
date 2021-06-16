import { Component, OnInit } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { MockedUsersService } from '../../../mocked-users.service';
import { NbTableSorterPagination, NbTableSorterHeader } from '../../../modules/nb-table-sorter';

@Component({
	selector: 'app-server-pagination',
	templateUrl: './server-pagination.component.html',
	styleUrls: ['./server-pagination.component.scss']
})
export class ServerPaginationComponent implements OnInit {

	pagination: Observable<NbTableSorterPagination>;
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
		event.searchKeys = this.searchKeys;
		this.pagination = timer(2048).pipe(map(_ => this._mockedUsersSvc.get(event)));
	}

	private _export(items) {
		console.log('export', items);
		this.pagination = null;
		this.fetch();
	}
}
