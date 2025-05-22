import { Observable } from 'rxjs';
import { Icon } from './paginable-table-header';
import { TableRow } from './table-row';
import { TableRowEvent } from './table-row-event';

/**
 * Represents a button that can be displayed in a row of the paginable table.
 *
 * @template T - The type of the data item associated with the row.
 */
export interface RowButton<T = any> {
	/**
	 * Optional title attribute of the button (for accessibility or extra description).
	 */
	title?: string | Observable<string>;

	/**
	 * Visible label displayed inside the button.
	 */
	label?: string | Observable<string>;

	/**
	 * Icon to be shown in the button. Can be a string or an `Icon` object.
	 */
	icon?: string | Icon;

	/**
	 * Function to be executed when the button is clicked.
	 * Receives the row context as a `TableRowEvent`.
	 */
	handler?: (event?: TableRowEvent<T>) => void;

	/**
	 * Visual color identifier for the button (e.g., 'primary', 'warn', etc).
	 */
	color?: string;

	/**
	 * Controls the visibility of the button.
	 * Can be a static boolean or a function that receives the row and returns a boolean.
	 */
	hidden?: boolean | ((row: TableRow<T>) => boolean);

	/**
	 * Additional CSS classes to be applied to the button.
	 */
	classlist?: string[] | string;
}
