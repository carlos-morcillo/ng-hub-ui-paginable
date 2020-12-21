export interface NbTableSorterHeader {
	title?: string;
	property: string;
	icon?: string;
	align?: string;
	sortable?: boolean;
	wrapping?: 'wrap' | 'nowrap';
	sticky?: 'start' | 'end';
}
