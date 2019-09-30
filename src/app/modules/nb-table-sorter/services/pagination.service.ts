import { Injectable } from '@angular/core';
import { TableSorterPagination } from '../table-sorter.component';
import * as _ from 'lodash';

@Injectable({
	providedIn: 'root'
})
export class PaginationService {
	generate(items: any[], params: any): any {
		let filtered = items.concat();
		if (params.searchText && params.searchKeys) {
			const searchText = params.searchText;
			if (searchText && searchText.trim() !== '') {
				filtered = filtered.filter((item) => {
					return params.searchKeys.some(o => {
						return _.get(item, o).toString().toLowerCase().indexOf(searchText) > -1;
					});
				});
			}
		}

		if (params.ordenation) {
			filtered = _.orderBy(filtered, [params.ordenation.property], [params.ordenation.direction]);
		}
		const page = params && params.page || 1;

		const pagination: TableSorterPagination = {
			current_page: page,
			last_page: Math.ceil(filtered.length / 15),
			per_page: 15,
			from: (page - 1) * 15,
			to: page * 15,
			total: filtered.length,
			data: filtered.slice((page - 1) * 15, page * 15)
		};
		return pagination;
	}
}
