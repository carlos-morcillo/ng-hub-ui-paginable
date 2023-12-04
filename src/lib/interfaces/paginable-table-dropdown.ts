import { PaginableTableButton } from './paginable-table-button';

export interface PaginableTableDropdown {
	title?: string;
	icon?: string;
	color?: string;
	buttons: Array<PaginableTableButton>;
	position?: 'left' | 'right' | 'start' | 'end' | null;
	fill?: 'clear' | 'outline' | null;
}
