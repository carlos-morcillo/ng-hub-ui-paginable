import { Component, OnInit } from '@angular/core';
import { PaginableTableHeader } from '../../../../ng-paginable';
import { MockedUsersService } from '../../../mocked-users.service';

@Component({
	selector: 'app-selectable-multiple',
	templateUrl: './selectable-multiple.component.html',
	styleUrls: ['./selectable-multiple.component.scss']
})
export class SelectableMultipleComponent implements OnInit {

	items: any[];
	headers: (PaginableTableHeader | string)[] = [
		'id',
		'username',
		'email',
		'name'
	];
	searchKeys: string[] = ['id', 'username', 'email', 'name'];

	selectedItems: any[];

	value: any[] = [1, 2, 3];

	constructor(
		private _mockedUsersSvc: MockedUsersService
	) { }

	ngOnInit() {
		this.items = this._mockedUsersSvc.items.map(o => Object.assign({}, o));
	}
}
