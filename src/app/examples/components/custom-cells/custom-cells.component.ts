import { Component, OnInit } from '@angular/core';
import { NbTableSorterHeader } from '../../../modules/nb-table-sorter';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'app-custom-cells',
	templateUrl: './custom-cells.component.html',
	styleUrls: ['./custom-cells.component.scss']
})
export class CustomCellsComponent implements OnInit {

	items: any[];
	headers: (NbTableSorterHeader | string)[] = [
		{
			property: 'avatar'
		},
		{
			property: 'name',
			title: 'Nombre',
			sortable: true
		},
		{
			property: 'email',
			title: 'Email',
			icon: 'at',
			sortable: true
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
