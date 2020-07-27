import { Component, OnInit } from '@angular/core';
import { NbTableSorterHeader } from '../../../modules/nb-table-sorter/interfaces/nb-table-sorter-header';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'app-client-pagination',
	templateUrl: './client-pagination.component.html',
	styleUrls: ['./client-pagination.component.scss']
})
export class ClientPaginationComponent implements OnInit {

	items: any[];
	headers: (NbTableSorterHeader | string)[] = [
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
