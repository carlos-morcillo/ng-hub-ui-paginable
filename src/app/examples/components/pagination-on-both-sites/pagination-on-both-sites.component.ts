import { Component, OnInit } from '@angular/core';
import { NbTableSorterHeader } from '../../../modules/nb-table-sorter';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'app-pagination-on-both-sites',
	templateUrl: './pagination-on-both-sites.component.html',
	styleUrls: ['./pagination-on-both-sites.component.scss']
})
export class PaginationOnBothSitesComponent implements OnInit {

	items: any[];
	headers: (NbTableSorterHeader | string)[] = [
		'name',
		{
			property: 'email',
			title: 'Email'
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
