import { Component, OnInit } from '@angular/core';
import { PaginableTableHeader } from '../../../../ng-paginable';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'app-pagination-up',
	templateUrl: './pagination-up.component.html',
	styleUrls: ['./pagination-up.component.scss']
})
export class PaginationUpComponent implements OnInit {

	items: any[];
	headers: (PaginableTableHeader | string)[] = [
		'name',
		{
			property: 'email',
			title: 'Email'
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
