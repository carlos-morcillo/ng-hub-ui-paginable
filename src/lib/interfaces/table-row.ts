/**
 * Represents a row within the table component.
 *
 * This interface is used to encapsulate a unit of data (of generic type T),
 * along with its selection and expansion (collapse) state, typically used
 * in paginable and interactive data tables.
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
