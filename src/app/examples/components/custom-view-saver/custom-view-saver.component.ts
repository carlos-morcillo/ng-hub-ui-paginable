import { Component, OnInit } from '@angular/core';
import { Observable, of, timer, map } from 'rxjs';
import { MockedUsersService } from '../../../mocked-users.service';
import { PaginableTablePagination, PaginableTableHeader, FilterChangeEvent } from '../../../../ng-paginable';
import { CustomViewSaverFormComponent } from '../custom-view-saver-form/custom-view-saver-form.component';

@Component({
	selector: 'app-custom-view-saver',
	templateUrl: './custom-view-saver.component.html',
	styleUrls: ['./custom-view-saver.component.scss']
})
export class CustomViewSaverComponent implements OnInit {

	viewSaverFormCpn = CustomViewSaverFormComponent;

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

}
