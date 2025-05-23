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

interface InputFilter {
	mode?: 'row' | 'menu';
	type: 'text' | 'number' | 'number-range' | 'date' | 'date-range';
	key?: string;
	placeholder?: string;
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
