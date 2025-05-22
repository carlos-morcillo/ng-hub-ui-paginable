/**
 * Represents the state and data of a row involved in a table event.
 *
 * This interface encapsulates a unit of data (of generic type T),
 * along with its current selection and collapse state. It is used
 * primarily in click or interaction events triggered within interactive
 * tables, such as when a user selects or expands a row.
 *
 * @template T - The type of the data contained in the row.
 */
export interface TableRow<T = any> {
	/**
	 * Indicates whether the row is currently selected.
	 * Useful for bulk actions or row-level operations.
	 */
	selected: boolean;

	/**
	 * Indicates whether the row is currently collapsed (not expanded).
	 * This is typically used when rows can display expandable detail sections.
	 */
	collapsed: boolean;

	/**
	 * The actual data contained in this row.
	 * Its shape is determined by the generic type T.
	 */
	data: T;
}

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
