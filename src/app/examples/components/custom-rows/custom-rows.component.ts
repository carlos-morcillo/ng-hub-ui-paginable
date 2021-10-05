import { Component, OnInit } from '@angular/core';
import { PaginableTableHeader } from '../../../../ng-paginable';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'app-custom-rows',
	templateUrl: './custom-rows.component.html',
	styleUrls: ['./custom-rows.component.scss']
})
export class CustomRowsComponent implements OnInit {

	items: any[];
	headers: (PaginableTableHeader | string)[] = [
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
