
export interface PaginableTablePagination {
	currentPage: number;
	firstPageUrl?: string;
	from: number;
	lastPage: number;
	lastPageUrl?: string;
	nextPageUrl?: string;
	path?: string;
	perPage: number;
	prevPageUrl?: any;
	to: number;
	total: number;
	data?: any[];
}
