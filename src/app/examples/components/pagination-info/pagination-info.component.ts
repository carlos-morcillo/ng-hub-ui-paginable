import { Component, OnInit } from '@angular/core';
import { PaginableTableHeader } from '../../../../ng-paginable';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'app-pagination-info',
	templateUrl: './pagination-info.component.html',
	styleUrls: ['./pagination-info.component.scss']
})
export class PaginationInfoComponent implements OnInit {

	items: any[];
	headers: (PaginableTableHeader | string)[] = [
		{
			property: 'id',
			title: 'Id'
		},
		{
			property: 'name',
			title: 'Name',
			icon: 'user',
		},
		{
			property: 'email',
			title: 'Email',
			icon: 'at'
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
