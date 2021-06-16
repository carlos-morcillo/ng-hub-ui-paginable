import { Component, OnInit } from '@angular/core';
import { NbTableSorterButton, NbTableSorterDropdown, NbTableSorterHeader } from '../../../../../public_api';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'nb-batch-actions',
	templateUrl: './batch-actions.component.html',
	styleUrls: ['./batch-actions.component.scss']
})
export class BatchActionsComponent implements OnInit {

	items: any[];
	selected = [];
	headers: (NbTableSorterHeader | string)[] = [
		'id',
		'username',
		'email',
		'name'
	];
	searchKeys: string[] = ['id', 'username', 'email', 'name'];

	batchActions: Array<NbTableSorterButton | NbTableSorterDropdown> = [
		{
			buttons: [
				{
					icon: 'fa fa-eye',
					title: 'view',
					handler: () => console.log('view', this.selected)
				},
				{
					icon: 'fa fa-pencil',
					title: 'edit',
					handler: () => console.log('edit', this.selected)
				},
				{
					icon: 'fa fa-trash',
					color: 'danger',
					title: 'delete',
					handler: () => console.log('delete', this.selected)
				}
			]
		}, {
			icon: 'fa fa-file-download',
			title: 'export',
			handler: () => console.log('export', this.selected)
		}
	];

	constructor(
		private _mockedUsersSvc: MockedUsersService
	) { }

	ngOnInit() {
		this.items = this._mockedUsersSvc.items;
	}
}
