import { Component, OnInit } from '@angular/core';
import { NbTableSorterHeader } from '../../../modules/nb-table-sorter/interfaces/nb-table-sorter-header';
import { NbTableSorterRowAction } from '../../../modules/nb-table-sorter/interfaces/nb-table-sorter-row-action';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'nb-expanding-rows',
	templateUrl: './expanding-rows.component.html',
	styleUrls: ['./expanding-rows.component.scss']
})
export class ExpandingRowsComponent implements OnInit {

	items: any[];
	headers: (NbTableSorterHeader | string)[] = [
		'id',
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
		this.items = this._mockedUsersSvc.items;
	}
}
