import { Component, OnInit } from '@angular/core';
import { NbTableSorterHeader } from '../../../../../public_api';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'nb-selectable',
	templateUrl: './selectable.component.html',
	styleUrls: ['./selectable.component.scss']
})
export class SelectableComponent implements OnInit {

	items: any[];
	headers: (NbTableSorterHeader | string)[] = [
		'id',
		'username',
		'email',
		'name'
	];
	searchKeys: string[] = ['id', 'username', 'email', 'name'];

	selectedItems: any[];

	constructor(
		private _mockedUsersSvc: MockedUsersService
	) { }

	ngOnInit() {
		this.items = this._mockedUsersSvc.items;
	}
}
