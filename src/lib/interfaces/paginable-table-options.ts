/**
 * Configuration options for a paginable table component.
 */
export interface PaginableTableOptions {
	/**
	 * Enables server-side pagination instead of client-side.
	 */
	serverSidePagination?: boolean;

	/**
	 * Sets the cursor style when hovering over table rows.
	 */
	cursor?: 'pointer' | 'default';

	/**
	 * Enables hover effects on table rows.
	 */
	hoverableRows?: boolean;

	/**
	 * Applies alternating background colors to rows, columns, or none.
	 */
	striped?: 'rows' | 'columns' | null;

	/**
	 * Custom color theme variant for styling the table.
	 * Can be any string value that maps to a predefined theme.
	 */
	variant?: string | null;

	/**
	 * Enables search functionality for table content.
	 */
	searchable?: boolean;

	/**
	 * Displays table in a collapsed state initially.
	 */
	collapsed?: boolean;

	/**
	 * Enables horizontal and/or vertical scrolling for table content.
	 */
	scrollable?: boolean;
}
