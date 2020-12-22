import { NbTableSorterButton } from './nb-table-sorter-button';
import { NbTableSorterDropdown } from './nb-table-sorter-dropdown';

export interface NbTableSorterHeader {
	title?: string;
	property?: string;
	icon?: string;
	align?: string;
	sortable?: boolean;
	wrapping?: 'wrap' | 'nowrap';
	sticky?: 'start' | 'end';
	buttons?: Array<NbTableSorterButton | NbTableSorterDropdown>
}
