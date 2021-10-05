import { Component, OnInit } from '@angular/core';
import { MockedUsersService } from '../../../mocked-users.service';
import { PaginableTableHeader } from '../../../../ng-paginable';

@Component({
	selector: 'not-paginated',
	templateUrl: './not-paginated.component.html',
	styleUrls: ['./not-paginated.component.scss']
})
export class NotPaginatedComponent implements OnInit {

	items: any[];
	headers: (PaginableTableHeader | string)[] = [
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
