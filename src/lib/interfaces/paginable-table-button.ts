import { Icon } from './paginable-table-header';

/**
 * This interface defines a type of button that can be used in a paginable table. It contains properties for the title, label,
 * tooltip, icon, handler function, color, hidden state and classlist of the button. The title and label properties are strings
 * that will be used to display the button in the table. The tooltip property is also a string and will be used to provide
 * additional information when hovering over the button. The icon property is a string that specifies an icon to be displayed
 * with the button. The color property is a
 * string that specifies the color of the button. The hidden property can either be a boolean value or a function that takes an
 * item as an argument and returns true or false depending on whether or not to hide the button for that item. Finally, the
 * classlist property can either be an array of strings or a single string containing classes to apply to the button element.
 *
 * @export
 * @interface PaginableTableButton
 */
export interface PaginableTableButton {
	title?: string;
	label?: string;
	tooltip?: string;
	icon?: string | Icon;
	/**
	 * Function that will be called when the button is clicked
	 *
	 * @memberof PaginableTableButton
	 */
	handler?: (item?: any) => void;
	color?: string;
	hidden?: boolean | ((item: any) => boolean);
	classlist?: string[] | string;
}
