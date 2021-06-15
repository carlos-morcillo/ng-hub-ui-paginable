import { Component, OnInit } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { MockedUsersService } from '../../../mocked-users.service';
import { NbTableSorterPagination, NbTableSorterHeader, NbTableSorterButton, NbTableSorterDropdown } from '../../../modules/nb-table-sorter';

@Component({
	selector: 'app-custom-loading',
	templateUrl: './custom-loading.component.html',
	styleUrls: ['./custom-loading.component.scss']
})
export class CustomLoadingComponent implements OnInit {

	pagination: Observable<NbTableSorterPagination>;
	headers: (NbTableSorterHeader | string)[] = [
		{
			title: 'id',
			property: 'id',
			filter: {
				type: 'number'
			}
		},
		{
			title: 'username',
			property: 'username',
			filter: {
				type: 'text'
			}
		},
		{
			title: 'email',
			property: 'email',
			align: 'end',
			filter: {
				type: 'dropdown',
				placeholder: 'email',
				options: of([{
					value: 1,
					text: 'one'
				}, {
					value: 2,
					text: 'two'
				}, {
					value: 3,
					text: 'three'
				}])
			}
		},
		'name'
	];
	searchKeys: string[] = ['id', 'username', 'email', 'name'];
	batchActions: Array<NbTableSorterButton | NbTableSorterDropdown> = [
		{
			buttons: [
				{
					icon: 'fa fa-eye',
					title: 'view',
					handler: (items) => this._export(items)
				},
				{
					icon: 'fas fa-file-download',
					title: 'export',
					handler: (items) => this._export(items)
				},
				{
					icon: 'fas fa-file-download',
					title: 'export',
					handler: (items) => this._export(items)
				}
			]
		}, {
			icon: 'fas fa-file-download',
			title: 'export',
			handler: (items) => this._export(items)
		}
	];

	constructor(
		private _mockedUsersSvc: MockedUsersService
	) { }

	ngOnInit() {
		this.fetch();
	}

	async fetch(event: any = {}) {
		try {
			event.searchKeys = this.searchKeys;
			this.pagination = timer(2000).pipe(map(o => this._mockedUsersSvc.get(event)));
		} catch (error) {
			console.error(error);
		}
	}

	private _export(items) {
		console.log('export', items);
		this.pagination = null;
	}
}
