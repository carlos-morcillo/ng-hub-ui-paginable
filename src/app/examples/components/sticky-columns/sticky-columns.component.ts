import { Component, OnInit } from '@angular/core';
import { NbTableSorterPagination, NbTableSorterHeader } from '../../../../../public_api';
import { MockedUsersService } from '../../../mocked-users.service';
import { NbTableSorterRowAction } from '../../../modules/nb-table-sorter';

@Component({
	selector: 'nb-sticky-columns',
	templateUrl: './sticky-columns.component.html',
	styleUrls: ['./sticky-columns.component.scss']
})
export class StickyColumnsComponent implements OnInit {

	pagination: NbTableSorterPagination;
	headers: (NbTableSorterHeader | string)[] = [
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
		'name'
	];
	searchKeys: string[] = ['id', 'username', 'email', 'name'];
	actions: NbTableSorterRowAction[] = [
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

}
