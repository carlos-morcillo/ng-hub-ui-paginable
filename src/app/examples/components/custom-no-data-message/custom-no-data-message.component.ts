import { Component, OnInit } from '@angular/core';
import { NbTableSorterHeader } from '../../../modules/nb-table-sorter';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'app-custom-no-data-message',
	templateUrl: './custom-no-data-message.component.html',
	styleUrls: ['./custom-no-data-message.component.scss']
})
export class CustomNoDataMessageComponent implements OnInit {

	items: any[];
	headers: (NbTableSorterHeader | string)[] = [
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
