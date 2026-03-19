import { Observable } from 'rxjs';
import type { Icon } from './paginable-table-header';
import type { TableRowEvent } from './table-row-event';
import type { TableRow } from './table-row';

/**
 * Shared action button contract used by both table and list components.
 *
 * The same interface is used for:
 * - Row-level actions (handler receives `TableRowEvent<T>`)
 * - Batch actions (handler receives `ReadonlyArray<T>`)
 *
 * @template T Type of the row item model.
 */
export interface PaginableActionButton<T = any> {
	/**
	 * Optional title displayed as tooltip or fallback label.
	 */
	title?: string | Observable<string>;

	/**
	 * Optional visible label rendered inside the action button.
	 */
	label?: string | Observable<string>;

	/**
	 * Icon configuration for the action.
	 */
	icon?: string | Icon;

	/**
	 * Handler for row or batch execution contexts.
	 */
	handler?: ((event: TableRowEvent<T>) => void) | ((items: ReadonlyArray<T>) => void);

	/**
	 * Optional visibility rule for row context rendering.
	 */
	hidden?: boolean | ((row: TableRow<T>) => boolean);

	/**
	 * Optional CSS class list for action button customization.
	 */
	classlist?: string[] | string;

	/**
	 * Tooltip text displayed on hover.
	 */
	tooltip?: string | Observable<string>;
}
