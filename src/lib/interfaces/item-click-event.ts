import { TableRowEvent } from './table-row';

/**
 * Represents a generic click event on a table row.
 *
 * @template T - The type of the row data.
 * @property {number} [depth] - Optional depth level in case of nested structures.
 * @property {number} [index] - Optional index of the row in the current page.
 * @property {boolean} selected - Whether the row is currently selected.
 * @property {boolean} collapsed - Whether the row is collapsed (used for expandable rows).
 * @property {T} value - The data object associated with the row.
 * @property {T} item - Alias of `value`, kept for backward compatibility or alternate usage.
 */
export interface ItemClickEvent<T = any> {
	depth?: number;
	index?: number;
	selected: boolean;
	collapsed: boolean;
	value: T;
	item: T;
}

/**
 * Represents a table row click event enriched with the originating mouse event.
 *
 * @template T - The type of the row data.
 * @extends TableRowEvent<T>
 * @property {MouseEvent} event - The mouse event that triggered the interaction.
 */
export type TableRowClickEvent<T = any> = TableRowEvent<T> & {
	event: MouseEvent;
};
