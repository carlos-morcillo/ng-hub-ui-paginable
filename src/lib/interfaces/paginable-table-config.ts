import { PaginableDefaults } from './paginable-defaults';
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
	/**
	 * Application-wide default values for component inputs (pagination on/off, page
	 * size, page-size options…). Applied unless overridden by an instance `@Input`.
	 * Register through {@link providePaginable}.
	 */
	defaults?: PaginableDefaults;
}
