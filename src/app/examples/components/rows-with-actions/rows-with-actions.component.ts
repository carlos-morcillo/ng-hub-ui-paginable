import { Component, OnInit } from '@angular/core';
import { NbTableSorterHeader } from '../../../modules/nb-table-sorter/nb-table-sorter-header';
import { MockedUsersService } from '../../../mocked-users.service';
import { NbTableSorterRowAction } from '../../../modules/nb-table-sorter/nb-table-sorter-row-action';

@Component({
	selector: 'app-rows-with-actions',
	templateUrl: './rows-with-actions.component.html',
	styleUrls: ['./rows-with-actions.component.scss']
})
export class RowsWithActionsComponent implements OnInit {

	items: any[];
	headers: (NbTableSorterHeader | string)[] = [
		'id',
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
		this.items = this._mockedUsersSvc.items;
	}
}
