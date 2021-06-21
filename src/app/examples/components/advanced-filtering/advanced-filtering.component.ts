import { Component, OnInit } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { MockedUsersService } from '../../../mocked-users.service';
import { NbTableSorterPagination, NbTableSorterHeader, NbTableSorterDropdown, NbTableSorterButton, FilterChangeEvent } from '../../../modules/nb-table-sorter';

@Component({
	selector: 'app-advanced-filtering',
	templateUrl: './advanced-filtering.component.html',
	styleUrls: ['./advanced-filtering.component.scss']
})
export class AdvancedFilteringComponent implements OnInit {

	pagination: Observable<NbTableSorterPagination>;
	headers: (NbTableSorterHeader | string)[] = [
		{
			title: 'id',
			property: 'id',
			filter: {
				type: 'number-range'
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
		// {
		// 	buttons: [
		// 		{
		// 			title: 'edit',
		// 			icon: 'fa fa-edit',
		// 			handler: (item) => console.log('edit', item)
		// 		},
		// 		{
		// 			title: 'delete',
		// 			color: 'danger',
		// 			icon: 'fa fa-trash',
		// 			handler: (item) => console.log('delete', item),
		// 		}
		// 	]
		// }
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
