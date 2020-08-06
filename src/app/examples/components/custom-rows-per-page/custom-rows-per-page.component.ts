import { Component, OnInit } from '@angular/core';
import { NbTableSorterHeader } from '../../../../../public_api';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'nb-custom-rows-per-page',
	templateUrl: './custom-rows-per-page.component.html',
	styleUrls: ['./custom-rows-per-page.component.scss']
})
export class CustomRowsPerPageComponent implements OnInit {

	items: any[];
	headers: (NbTableSorterHeader | string)[] = [
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
