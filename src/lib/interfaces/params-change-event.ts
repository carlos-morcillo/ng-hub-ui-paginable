import { PaginableTableOrdination } from './paginable-table-ordination';

export interface PaginationParamsChangeEvent {
	page: number;
	perPage: number;
	ordination?: PaginableTableOrdination;
	searchText?: any;
	searchKeys?: string[];
	paginate?: boolean;
}
