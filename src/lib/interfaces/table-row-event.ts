import { TableRow } from './table-row';

/**
 * Extends the basic table row state with the originating MouseEvent.
 *
 * This type is used in table components to describe a user interaction event
 * (typically a click) on a row, combining the row's selection and expansion state
 * with the native DOM event that triggered it.
 *
 * @template T - The type of the data contained in the row.
 */
export type TableRowEvent<T = any> = TableRow<T> & {
	/**
	 * The native DOM MouseEvent that originated the interaction.
	 * Useful to determine click position, button type, etc.
	 */
	event: MouseEvent;
};
