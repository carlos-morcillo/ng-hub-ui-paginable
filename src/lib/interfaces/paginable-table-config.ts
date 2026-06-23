import { PaginableStateDefault } from './paginable-state';

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
	/**
	 * Application-wide default components for the loading / error / no-results
	 * states. Used by every paginable component unless overridden locally by an
	 * instance `@Input` or a content-projected directive template.
	 */
	states?: {
		loading?: PaginableStateDefault;
		error?: PaginableStateDefault;
		noResults?: PaginableStateDefault;
	};
}
