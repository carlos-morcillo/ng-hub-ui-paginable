import { Component, OnInit } from '@angular/core';
import { NbTableSorterHeader } from '../../../modules/nb-table-sorter/interfaces/nb-table-sorter-header';
import { MockedUsersService } from '../../../mocked-users.service';

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
		{
			buttons: [
				{
					title: 'view',
					icon: 'fa fa-eye',
					handler: (item) => console.log('view', item)
				}
			]
		},
		'email',
		'name',
		{
			property: 'actions',
			buttons: [
				{
					title: 'edit',
					icon: 'fa fa-edit',
					handler: (item) => console.log('edit', item),
					hidden: true
				},
				{
					title: 'delete',
					color: 'danger',
					icon: 'fa fa-trash',
					handler: (item) => console.log('delete', item),
				},
				{
					title: 'delete',
					color: 'info',
					icon: 'fa fa-ellipsis-v',
					buttons: [
						{
							title: 'edit',
							icon: 'fa fa-edit',
							handler: (item) => console.log('edit', item),
						},
						{
							title: 'delete',
							color: 'danger',
							icon: 'fa fa-trash',
							handler: (item) => console.log('delete', item),
						},
						{
							title: 'delete',
							color: 'warning',
							icon: 'fa fa-trash',
							handler: (item) => console.log('delete', item),
							hidden: true,
						}
					]
				},
			]
		}
	];
	searchKeys: string[] = ['id', 'username', 'email', 'name'];

	constructor(
		private _mockedUsersSvc: MockedUsersService
	) { }

	ngOnInit() {
		this.items = this._mockedUsersSvc.items;
	}
}
