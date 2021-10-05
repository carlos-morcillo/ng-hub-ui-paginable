import { Observable } from 'rxjs';
import { NbTableSorterButton } from './nb-table-sorter-button';
import { NbTableSorterDropdown } from './nb-table-sorter-dropdown';

export interface PaginableTableHeader {
	title?: string;
	property?: string;
	icon?: string;
	align?: 'start' | 'end' | 'center';
	sortable?: boolean;
	wrapping?: 'wrap' | 'nowrap';
	sticky?: 'start' | 'end';
	buttons?: Array<NbTableSorterButton | NbTableSorterDropdown>;
	filter?: InputFilter | DropdownFilter;
	onlyButtons?: boolean;
}

interface InputFilter {
	type: 'text' | 'number' | 'number-range' | 'date' | 'date-range';
	key?: string;
	placeholder?: string;
}

interface DropdownFilter {
	type: 'dropdown';
	key?: string;
	options: any[] | Promise<any[]> | Observable<any[]>;
	placeholder?: string;
	bindLabel?: string;
	bindValue?: string;
}

