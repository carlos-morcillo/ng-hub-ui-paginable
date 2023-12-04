import { Observable } from 'rxjs';
import { PaginableTableButton } from './paginable-table-button';
import { PaginableTableDropdown } from './paginable-table-dropdown';

export interface PaginableTableHeader {
	title?: string;
	property: string;
	icon?: string;
	align?: 'start' | 'end' | 'center';
	sortable?: boolean;
	wrapping?: 'wrap' | 'nowrap';
	sticky?: 'start' | 'end';
	buttons?: Array<PaginableTableButton | PaginableTableDropdown>;
	filter?: InputFilter | DropdownFilter;
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
