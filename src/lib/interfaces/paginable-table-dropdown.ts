import { Observable } from 'rxjs';
import { RowButton } from './row-button';

/**
 * Represents a dropdown menu containing multiple action buttons.
 * Used for grouping related actions in a collapsible menu within table rows.
 */
export interface PaginableTableDropdown {
	/**
	 * Title text displayed on the dropdown toggle button.
	 * Can be a static string or an Observable for dynamic/translated content.
	 */
	title?: string | Observable<string>;

	/**
	 * Tooltip text displayed on hover over the dropdown toggle.
	 * Can be a static string or an Observable for dynamic/translated content.
	 */
	tooltip?: string | Observable<string>;

	/**
	 * Icon class or identifier to display in the dropdown toggle.
	 */
	icon?: string;

	/**
	 * Visual color identifier for the dropdown button (e.g., 'primary', 'warn').
	 */
	color?: string;

	/**
	 * Array of action buttons contained within the dropdown menu.
	 */
	buttons: ReadonlyArray<RowButton>;

	/**
	 * Position of the dropdown menu relative to the toggle button.
	 */
	position?: 'left' | 'right' | 'start' | 'end' | null;

	/**
	 * Visual fill style of the dropdown button.
	 */
	fill?: 'clear' | 'outline' | null;
}
