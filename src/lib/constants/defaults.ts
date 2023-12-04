import { PaginableTableConfig } from '../interfaces/paginable-table-config';

export const DEFAULT_LANGUAGE = navigator.language.split('-').at(0) ?? 'en';
export const DEFAULT_PAGINABLE_CONFIG: PaginableTableConfig = {
	theme: null,
	mapping: {
		currentPage: 'currentPage',
		lastPage: 'lastPage',
		data: 'data',
		total: 'total'
	},
	views: {
		key: 'paginable-table_view_'
	},
	language: DEFAULT_LANGUAGE
};
