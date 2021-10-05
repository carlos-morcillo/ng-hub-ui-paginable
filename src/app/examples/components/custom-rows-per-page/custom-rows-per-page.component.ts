import { Component, OnInit } from '@angular/core';
import { PaginableTableHeader } from '../../../../ng-paginable';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'custom-rows-per-page',
	templateUrl: './custom-rows-per-page.component.html',
	styleUrls: ['./custom-rows-per-page.component.scss']
})
export class CustomRowsPerPageComponent implements OnInit {

	items: any[];
	headers: (PaginableTableHeader | string)[] = [
		'id',
		'username',
		'email',
		'name'
	];
	searchKeys: string[] = ['id', 'username', 'email', 'name'];
	selectedItems: any[];

	constructor(
		private _mockedUsersSvc: MockedUsersService
	) { }

	ngOnInit() {
		this.items = this._mockedUsersSvc.items;
	}
}
