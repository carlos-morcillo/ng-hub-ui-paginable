import { RowButton } from './row-button';

export interface PaginableTableDropdown {
	title?: string;
	tooltip?: string;
	icon?: string;
	color?: string;
	buttons: ReadonlyArray<RowButton>;
	position?: 'left' | 'right' | 'start' | 'end' | null;
	fill?: 'clear' | 'outline' | null;
}
