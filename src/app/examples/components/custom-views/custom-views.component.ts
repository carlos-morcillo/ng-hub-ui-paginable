import { Component, OnInit } from '@angular/core';
import { Observable, timer, map, of } from 'rxjs';
import { MockedUsersService } from '../../../mocked-users.service';
import { PaginableTablePagination, PaginableTableHeader, FilterChangeEvent } from '../../../../ng-paginable';
import { View } from '../../../../ng-paginable/interfaces/view';

@Component({
	selector: 'app-custom-views',
	templateUrl: './custom-views.component.html',
	styleUrls: ['./custom-views.component.scss']
})
export class CustomViewsComponent implements OnInit {

	pagination: Observable<PaginableTablePagination>;
	headers: (PaginableTableHeader | string)[] = [
		{
			title: 'id',
			property: 'id'
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
				bindValue: 'value',
				bindLabel: 'text',
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
		}, {
			title: 'date',
			property: 'date',
			filter: {
				type: 'date-range'
			}
		},
		'name',
		{
			buttons: [
				{
					title: 'edit',
					icon: 'fa fa-edit',
					handler: (item) => console.log('edit', item)
				},
				{
					title: 'delete',
					color: 'danger',
					icon: 'fa fa-trash',
					handler: (item) => console.log('delete', item),
				}
			]
		}
	];
	searchKeys: string[] = ['id', 'username', 'email', 'name'];

	viewKey: string = 'tableViewK';

	views: View[] = [
		{
			"key": "aaaa",
			"name": "Migueles",
			"conditions": [
				{
					"key": "id",
					"operation": "equal",
					"value": null
				},
				{
					"key": "username",
					"operation": "equal",
					"value": "miguel"
				},
				{
					"key": "email",
					"operation": "equal",
					"value": null
				},
				{
					"key": "date",
					"operation": "equal",
					"value": null
				}
			]
		},
		{
			"key": "bbbb",
			"name": "Pedros",
			"conditions": [
				{
					"key": "id",
					"operation": "equal",
					"value": null
				},
				{
					"key": "username",
					"operation": "equal",
					"value": "pedro"
				},
				{
					"key": "email",
					"operation": "equal",
					"value": null
				},
				{
					"key": "date",
					"operation": "equal",
					"value": null
				}
			]
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

	onFilterChange(value: FilterChangeEvent) {
		console.log(value);
	}

	saveView(view: View) {
		const index = this.views.findIndex(o => o.key === view.key);
		return index > -1 ? this.views.splice(index, 1, view) : this.views.push(view);
	}

	deleteView(view: View | string) {
		const index = this.views.findIndex(o => o.key === (view instanceof Object ? view.key : view));
		return index > -1 && this.views.splice(index, 1);
	}

}
