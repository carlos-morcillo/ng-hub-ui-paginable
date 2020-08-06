import { Injectable } from '@angular/core';
import { NbTableSorterPagination } from '../interfaces/nb-table-sorter-pagination';

@Injectable({
	providedIn: 'root'
})
export class PaginationService {
	generate(items: any[], params: any): any {
		let filtered = [];
		if (items && items.length) {
			filtered = items.concat();
			if (params.searchText && params.searchKeys) {
				const searchText = params.searchText;
				if (searchText && searchText.trim() !== '') {
					filtered = filtered.filter((item) => {
						return params.searchKeys.some(o =>
							this.get(item, o).toString().toLowerCase().indexOf(searchText) > -1
						);
					});
				}
			}

			if (params.ordenation) {
				filtered = this.orderBy(filtered, params.ordenation.property, params.ordenation.direction);

			}
		}
		const page = params.page || 1;
		const perPage = params.perPage || 20;

		const pagination: NbTableSorterPagination = {
			current_page: page,
			last_page: Math.ceil(filtered.length / perPage),
			per_page: perPage,
			from: (page - 1) * perPage,
			to: page * perPage,
			total: filtered.length,
			data: filtered.slice((page - 1) * perPage, page * perPage)
		};
		return pagination;
	}

	/**
	 * Creates an array of elements, sorted in ascending or descending order by the results of running each element 
	 * in a collection thru each iteratee. This method performs a stable sort, that is, it preserves the original s
	 * ort order of equal elements. The iteratees are invoked with one argument: (value).
	 * 
	 * @param collection 
	 * @param iteratee 
	 * @param direction 
	 */
	orderBy(collection: any[], iteratee: string, direction: string = 'asc') {
		return collection.sort((b, a) => {
			const aSort = this.get(a, iteratee);
			const bSort = this.get(b, iteratee);
			if (direction === 'desc') {
				return (aSort > bSort) ? 1 : (bSort > aSort ? -1 : 0);
			} else {
				return (aSort < bSort) ? 1 : (bSort < aSort ? -1 : 0)
			}
		});
	}

	get(object: any, path: string | any[]) {
		if (path.constructor.name === 'String') {
			path = (path as string).split('.');
		}
		return (path as any[]).reduce((o, k) => (o && o[k] !== 'undefined') ? o[k] : undefined, object);
	}

}
