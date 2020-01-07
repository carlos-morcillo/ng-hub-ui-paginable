import { Component, OnInit } from '@angular/core';
import { TableSorterPagination } from '../../../modules/nb-table-sorter/table-sorter.component';
import { NbTableSorterHeader } from '../../../modules/nb-table-sorter/nb-table-sorter-header';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'app-server-pagination',
	templateUrl: './server-pagination.component.html',
	styleUrls: ['./server-pagination.component.scss']
})
export class ServerPaginationComponent implements OnInit {

	pagination: TableSorterPagination;
	headers: (NbTableSorterHeader | string)[] = [
		'id',
		'username',
		'email',
		'name'
	];
	searchKeys: string[] = ['id', 'username', 'email', 'name'];

	code = `
		<table-sorter
		[headers]="headers"
		[pagination]="pagination"
		[paginationInfo]="true" 
		[searchKeys]="searchKeys">
		</table-sorter>`;
	typescript = `
		{"current_page":1,"last_page":12,"per_page":10,"from":0,"to":10,"total":116,"data":[{"id":1,"username":"gabriel","email":"gabriel.gonzalez@fakecompany.es","name":"Gabriel González"},{"id":2,"username":"fran","email":"paco.arias@fakecompany.es","name":"Paco Arias"},{"id":3,"username":"francis","email":"paco.romero@fakecompany.es","name":"Paco Romero"},{"id":4,"username":"miguel","email":"miguel.alfaro@fakecompany.es","name":"Miguel Alfaro"},{"id":5,"username":"fernando","email":"fernando.gordo@fakecompany.es","name":"Fernando Gordo"},{"id":6,"username":"marta","email":"marta.blazquez@fakecompany.es","name":"Marta Blazquez"},{"id":7,"username":"luis","email":"luis.martinez@fakecompany.es","name":"Luis Martínez Martínez"},{"id":8,"username":"jaime","email":"jaime.carrion@fakecompany.es","name":"Jaime Carrión"},{"id":9,"username":"javi","email":"miguel.villanueva@fakecompany.es","name":"Miguel Villanueva"},{"id":10,"username":"jalberto","email":"juanalberto.martinez@fakecompany.es","name":"Juan Alberto Martínez"}]}`;


	language: 'html' | 'typescript' = 'html';

	constructor(
		private _mockedUsersSvc: MockedUsersService
	) { }

	ngOnInit() {
		this.fetch();
	}

	async fetch(event: any = {}) {
		try {
			event.searchKeys = this.searchKeys;
			this.pagination = this._mockedUsersSvc.get(event);
		} catch (error) {
			console.error(error);
		}
	}

}
