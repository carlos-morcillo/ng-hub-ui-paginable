import { RowButton } from './row-button';

/**
 * Represents a list-level action button that applies to one or more selected items.
 *
 * This type extends `RowButton` but overrides the handler to receive all selected items
 * instead of a single row event. It is typically used for bulk actions, such as
 * "Delete Selected", "Export All", etc.
 *
 * @template T - The type of the item data the button operates on.
 */
export type ListButton<T = any> = Omit<RowButton<T>, 'handler'> & {
	/**
	 * Function to execute on click, receiving an array of selected items.
	 */
	handler?: (items: ReadonlyArray<T>) => void;
};
