export interface NbTableSorterConfig {
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
