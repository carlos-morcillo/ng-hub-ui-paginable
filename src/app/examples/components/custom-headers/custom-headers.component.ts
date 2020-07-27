import { Component, OnInit } from '@angular/core';
import { NbTableSorterHeader } from '../../../modules/nb-table-sorter';
import { MockedUsersService } from '../../../mocked-users.service';


@Component({
	selector: 'app-custom-headers',
	templateUrl: './custom-headers.component.html',
	styleUrls: ['./custom-headers.component.scss']
})
export class CustomHeadersComponent implements OnInit {

	items: any[];
	headers: (NbTableSorterHeader | string)[] = [
		{
			property: 'id',
			title: 'Id'
		},
		{
			property: 'name',
			title: 'Nombre y apellidos',
			icon: 'user',
		},
		{
			property: 'email',
			title: 'Corre electrónico',
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
