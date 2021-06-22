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
			buttons: [
				{
					title: 'hidden_edit',
					icon: 'fa fa-edit',
					handler: (item) => console.log('hidden_edit', item),
					hidden: true
				},
				{
					title: 'view',
					icon: 'fa fa-eye',
					handler: (item) => console.log('view', item),
				},
				{
					title: 'edit',
					icon: 'fa fa-edit',
					handler: (item) => console.log('edit', item),
					hidden: (item) => item.id % 2 === 0
				}, {
					title: 'delete',
					color: 'danger',
					icon: 'fa fa-trash',
					handler: (item) => console.log('delete', item),
					hidden: (item) => item.id % 3 === 0
				}, {
					icon: 'fa fa-ellipsis-v',
					buttons: [
						{
							title: 'view',
							icon: 'fa fa-eye',
							handler: (item) => console.log('view', item),
							hidden: (item) => {
								return item.id % 2 === 1
							}
						}, {
							title: 'edit',
							icon: 'fa fa-edit',
							handler: (item) => console.log('edit', item),
						}, {
							title: 'delete',
							color: 'warning',
							icon: 'fa fa-trash',
							handler: (item) => console.log('delete', item),
							hidden: true
						}
					]
				}
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
