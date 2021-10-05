export interface PaginableTableConfig {
	theme?: string;
	mapping?: {
		currentPage?: string;
		lastPage?: string;
		total?: string;
		data?: string;
	};
	views?: {
		key?: string;
	}
}
