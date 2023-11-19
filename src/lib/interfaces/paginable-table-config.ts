export interface PaginableTableConfig {
	theme?: string | null;
	mapping?: {
		currentPage?: string;
		lastPage?: string;
		total?: string;
		data?: string;
	};
	views?: {
		key?: string;
	};
	language?: string;
}
