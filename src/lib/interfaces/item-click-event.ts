/**
 * Represents a click interaction on an item within a list-based component.
 *
 * This interface encapsulates both the structural context of the clicked item
 * (such as its depth or index) and its state (selection and expansion),
 * along with the actual data it represents.
 *
 * Commonly used in tree lists or nested data tables to track user interactions.
 *
 * @template T - The type of the item data.
 */
export interface ListClickEvent<T = any> {
	/**
	 * Optional depth level of the item within a nested or hierarchical structure.
	 * Depth 0 usually represents a root item, with increasing values for children.
	 */
	depth?: number;

	/**
	 * Optional index of the item within the current list or page.
	 * Useful for tracking order or position-based operations.
	 */
	index?: number;

	/**
	 * Indicates whether the item is currently selected.
	 */
	selected: boolean;

	/**
	 * Indicates whether the item is collapsed.
	 * Typically used for expandable rows or tree items.
	 */
	collapsed: boolean;

	/**
	 * The value associated with the list item.
	 *
	 * If a `bindValue` input is defined, this property will contain the value
	 * extracted from the item using that key. Otherwise, it defaults to the full item object.
	 *
	 * Useful for binding simple primitive values or unique identifiers (e.g., `item.id`).
	 */
	value: T;

	/**
	 * The full object representing the list item.
	 *
	 * This includes all original properties and metadata, regardless of the `bindValue` configuration.
	 * Use this when full context is needed (e.g., for rendering, tooltips, nested actions).
	 */
	item: T;

	/**
	 * The native MouseEvent that triggered this interaction.
	 * Useful for determining click position, button type, modifier keys, etc.
	 */
	mouseEvent: MouseEvent;
}
