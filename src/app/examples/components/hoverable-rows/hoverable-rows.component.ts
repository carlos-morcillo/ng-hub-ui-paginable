import { Component, OnInit } from '@angular/core';
import { MockedUsersService } from '../../../mocked-users.service';
import { PaginableTablePagination, PaginableTableHeader, PaginableTableOptions } from '../../../../ng-paginable';

@Component({
	selector: 'app-hoverable-rows',
	templateUrl: './hoverable-rows.component.html',
	styleUrls: ['./hoverable-rows.component.scss']
})
export class HoverableRowsComponent implements OnInit {

	pagination: PaginableTablePagination;
	headers: (PaginableTableHeader | string)[] = [
		'id',
		'username',
		{
			title: 'email',
			property: 'email',
			align: 'end',
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
	options: PaginableTableOptions = {
		hoverableRows: true
	};

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
