import { Component, OnInit } from '@angular/core';
import { NbTableSorterHeader } from '../../nb-table-sorter-header';
import { MockedUsersService } from '../../../../mocked-users.service';

@Component({
	selector: 'app-sortable',
	templateUrl: './sortable.component.html',
	styleUrls: ['./sortable.component.scss']
})
export class SortableComponent implements OnInit {

	items: any[];
	headers: (NbTableSorterHeader | string)[] = [
		'id',
		{
			property: 'username',
			title: 'Usuario',
			sortable: true
		},
		{
			property: 'email',
			title: 'Email',
			icon: 'at',
			sortable: true
		},
		'name'
	];
	searchKeys: string[] = ['id', 'username', 'email', 'name'];

	constructor(
		private _mockedUsersSvc: MockedUsersService
	) { }

	ngOnInit() {
		this.items = this._mockedUsersSvc.items;
	}
}
