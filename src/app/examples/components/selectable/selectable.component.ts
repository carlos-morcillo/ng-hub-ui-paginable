import { Component, OnInit } from '@angular/core';
import { MockedUsersService } from '../../../mocked-users.service';
import { PaginableTableHeader } from '../../../../ng-paginable';

@Component({
	selector: 'selectable',
	templateUrl: './selectable.component.html',
	styleUrls: ['./selectable.component.scss']
})
export class SelectableComponent implements OnInit {

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
