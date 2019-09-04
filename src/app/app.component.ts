import { Component, OnInit } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { NbTableSorterHeader } from './modules/nb-table-sorter/nb-table-sorter-header';
import { UsersService } from './users.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	title = 'nb-table-sorter';
	items: any[];

	columns1: (NbTableSorterHeader | string)[] = [
		'nombre',
		{
			property: 'role.nombre',
			title: 'Rol'
		}
	];

	columns2: (NbTableSorterHeader | string)[] = [
		{
			property: 'idUsuario',
			title: 'Id'
		},
		{
			property: 'nombre',
			title: 'Nombre y apellidos',
			icon: 'user'
		},
		{
			property: 'role.nombre',
			title: 'Rol',
			icon: 'road'
		}
	];

	constructor(
		private _usersSvc: UsersService
	) {
		setTheme('bs4');
	}

	ngOnInit(): void {
		this.items = this._usersSvc.get();
	}

	load(event: Event) {
		alert('Item clicked!');
	}
}
