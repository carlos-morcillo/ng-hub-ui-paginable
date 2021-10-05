import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MockedUsersService } from '../../../mocked-users.service';
import { PaginableTablePagination, PaginableTableHeader, PaginableTableButton, PaginableTableDropdown } from '../../../../ng-paginable';

@Component({
	selector: 'app-custom-error',
	templateUrl: './custom-error.component.html',
	styleUrls: ['./custom-error.component.scss']
})
export class CustomErrorComponent implements OnInit {

	pagination: Observable<PaginableTablePagination>;
	headers: (PaginableTableHeader | string)[] = [
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
	batchActions: Array<PaginableTableButton | PaginableTableDropdown> = [
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
		event.searchKeys = this.searchKeys;
		this.pagination = timer(2000).pipe(switchMap(o => throwError(() => {
			const error: any = new Error(`This is an error`);
			error.timestamp = Date.now();
			return error;
		})));
	}

	private _export(items) {
		console.log('export', items);
		this.pagination = null;
	}
}

