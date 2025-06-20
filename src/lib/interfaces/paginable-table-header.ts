import { Observable } from 'rxjs';
import { PaginableTableDropdown } from './paginable-table-dropdown';
import { RowButton } from './row-button';

export interface PaginableTableHeader {
	title?: string | Observable<string>;
	property: string;
	icon?: string | Icon;
	align?: 'start' | 'end' | 'center';
	sortable?: boolean;
	wrapping?: 'wrap' | 'nowrap';
	sticky?: 'start' | 'end';
	buttons?: Array<RowButton | PaginableTableDropdown>;
	filter?: InputFilter | DropdownFilter | BooleanFilter;
	onlyButtons?: boolean;
}

/**
 * Represents the configuration for an input filter used in a paginable table header.
 *
 * @property mode - Optional. Specifies the display mode of the filter input, either 'row' or 'menu'.
 * @property type - The type of the filter input, defined by `MenuFilterInputType`.
 * @property key - Optional. The key associated with the filter, typically used for identifying the filter field.
 * @property placeholder - Optional. Placeholder text to display in the filter input.
 */
interface InputFilter {
	mode?: 'row' | 'menu';
	type: `${MenuFilterInputType}`;
	key?: string;
	placeholder?: string;
}

/**
 * Enum representing the available input types for menu filters.
 * These types define how the user can input data for filtering.
 */
export enum MenuFilterInputType {
	/**
	 * A simple text input (e.g., string, keyword).
	 */
	Text = 'text',

	/**
	 * A single numeric input (e.g., quantity, price).
	 */
	Number = 'number',

	/**
	 * A range input for numbers (e.g., min and max values).
	 */
	NumberRange = 'number-range',

	/**
	 * A single date input (e.g., created at, due date).
	 */
	Date = 'date',

	/**
	 * A range input for dates (e.g., from - to).
	 */
	DateRange = 'date-range',

	/**
	 * A boolean input for true/false filters
	 */
	Boolean = 'boolean'
}

interface DropdownFilter {
	type: 'dropdown';
	mode?: 'row' | 'menu';
	key?: string;
	options: any[] | Promise<any[]> | Observable<any[]>;
	placeholder?: string;
	bindLabel?: string;
	bindValue?: string;
}

interface BooleanFilter {
	type: 'boolean';
	mode?: 'row' | 'menu';
	key?: string;
	placeholder?: string;
	trueLabel?: string;
	falseLabel?: string;
}

export interface Icon {
	type: 'font-awesome' | 'material' | 'bootstrap';
	variant?: string;
	value: string;
}
