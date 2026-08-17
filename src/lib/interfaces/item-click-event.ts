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
	 * The item's label, as `bindLabel` names it.
	 *
	 * `bindLabel` rather than `bindValue`, and it defaults to `'label'` — so on an item that
	 * has no such property this is `undefined`, which is the honest answer and not an error.
	 * For the item itself, read {@link item}.
	 */
	value: T;

	/**
	 * The list item itself — the object you passed in `items`, untouched.
	 *
	 * Until 22.12.0 this carried the internal form group wrapping the item
	 * (`{selected, collapsed, data, children}`) while this type promised `T`, so a consumer
	 * reading `event.item.<field>` by the types got `undefined` with no error and no warning.
	 * It is the item now; `selected`, `collapsed` and `children` have fields of their own here.
	 */
	item: T;

	/**
	 * The children of a group row, when the item has any.
	 *
	 * The items themselves, in the shape they were passed, not the internal wrapping. Empty
	 * for a leaf. Useful for a group heading that acts on everything under it.
	 */
	children: T[];

	/**
	 * The native MouseEvent that triggered this interaction.
	 * Useful for determining click position, button type, modifier keys, etc.
	 */
	mouseEvent: MouseEvent;
}
