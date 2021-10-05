import { Component, OnInit } from '@angular/core';
import { MockedUsersService } from '../../../mocked-users.service';
import { PaginableTableHeader, PaginableTablePagination } from '../../../../ng-paginable';

@Component({
	selector: 'sticky-columns',
	templateUrl: './sticky-columns.component.html',
	styleUrls: ['./sticky-columns.component.scss']
})
export class StickyColumnsComponent implements OnInit {

	pagination: PaginableTablePagination;
	headers: (PaginableTableHeader | string)[] = [
		{
			property: 'id',
			sticky: 'start'
		},
		'username',
		'email',
		'name',
		'username',
		'email',
		'name',
		'username',
		'email',
		'name',
		{
			property: 'actions',
			sticky: 'end',
			buttons: [
				{
					title: 'edit',
					icon: 'fa fa-edit',
					handler: (item) => console.log('edit', item)
				},
				{
					title: 'delete',
					color: 'danger',
					icon: 'fa fa-trash',
					handler: (item) => console.log('delete', item)
				}
			]
		}
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
