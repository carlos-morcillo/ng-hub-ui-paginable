import { Component, OnInit } from '@angular/core';
import { PaginableTableHeader } from '../../../../ng-paginable/interfaces/paginable-table-header';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'app-client-pagination',
	templateUrl: './client-pagination.component.html',
	styleUrls: ['./client-pagination.component.scss']
})
export class ClientPaginationComponent implements OnInit {

	items: any[];
	headers: (PaginableTableHeader | string)[] = [
		'id',
		'username',
		'email',
		'name'
	];
	searchKeys: string[] = ['id', 'username', 'email', 'name'];

	constructor(
		private _mockedUsersSvc: MockedUsersService
	) { }

	ngOnInit() {
		this.items = this._mockedUsersSvc.items;
	}

	itemClicked(item: any) {
		console.log(item);
	}

}
