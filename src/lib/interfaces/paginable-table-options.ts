/* Specifies the options that can be
passed to a paginable table component. */
export interface PaginableTableOptions {
	serverSidePagination?: boolean;
	cursor?: 'pointer' | 'default';
	hoverableRows?: boolean;
	striped?: 'rows' | 'columns' | null;
	/* Allows for specifying a custom colour variant for the table component. The `variant` property is optional and of type 
	`string`, meaning it can accept any string value. This allows for customization and flexibility in styling the table 
	component based on different variants or themes. */
	variant?: string | null;
	searchable?: boolean;
}
