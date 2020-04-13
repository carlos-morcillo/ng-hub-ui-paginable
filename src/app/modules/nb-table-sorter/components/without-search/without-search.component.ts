import { Component, OnInit } from '@angular/core';
import { NbTableSorterHeader } from '../../nb-table-sorter-header';
import { MockedUsersService } from '../../../../mocked-users.service';

@Component({
	selector: 'app-without-search',
	templateUrl: './without-search.component.html',
	styleUrls: ['./without-search.component.scss']
})
export class WithoutSearchComponent implements OnInit {

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
