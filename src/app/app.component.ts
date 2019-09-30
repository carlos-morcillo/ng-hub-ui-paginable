import { Component, OnInit } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { NbTableSorterHeader } from './modules/nb-table-sorter/nb-table-sorter-header';
import { TableSorterOptions, TableSorterPagination } from './modules/nb-table-sorter/table-sorter.component';
import { MockedUsersService } from './mocked-users.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	options: TableSorterOptions = {
	}
	title = 'nb-table-sorter';
	items: any[];
	pagination: TableSorterPagination;

	headers1: (NbTableSorterHeader | string)[] = [
		'name',
		{
			property: 'email',
			title: 'Email'
		}
	];

	headers2: (NbTableSorterHeader | string)[] = [
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

	items3: any[];
	headers3: (NbTableSorterHeader | string)[] = [
		'id',
		{
			property: 'username',
			title: 'Usuario',
			icon: 'person',
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
	searchKeys3: string[] = ['id', 'username', 'email', 'name']

	constructor(
		private _mockedUsersSvc: MockedUsersService
	) {
		// setTheme('bs4');
	}

	ngOnInit(): void {
		this.items = this._mockedUsersSvc.items;
		this.fetch('pagination');
	}

	load(event: Event) {
		alert('Item clicked!');
	}

	async fetch(collectionName: string, event: any = {}) {
		try {
			event.searchKeys = this.searchKeys3;
			this[collectionName] = this._mockedUsersSvc.get(event);
			console.log(this[collectionName]);
		} catch (error) {
			console.error(error);
		}
	}
}
