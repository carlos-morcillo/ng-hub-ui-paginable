import { Component, OnInit } from '@angular/core';
import { NbTableSorterHeader } from '../../nb-table-sorter-header';
import { MockedUsersService } from '../../../../mocked-users.service';

@Component({
	selector: 'app-custom-cells',
	templateUrl: './custom-cells.component.html',
	styleUrls: ['./custom-cells.component.scss']
})
export class CustomCellsComponent implements OnInit {

	items: any[];
	headers: (NbTableSorterHeader | string)[] = [
		{
			property: null,
			title: '',
			wrapping: 'nowrap'
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
		},
		{
			property: null,
			title: '',
			wrapping: 'nowrap'
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
