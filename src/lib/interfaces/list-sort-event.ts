/**
 * Event emitted by `hub-list` after a drag-and-drop reorder operation completes.
 *
 * The list reorders its own view optimistically and emits this event so the consumer
 * can persist the new order. When an item is transferred between two lists that share a
 * `dragGroup`, the event is emitted **only by the destination list**, exposing both the
 * destination collection (`items`) and the source collection (`previousItems`).
 *
 * @template T The type of the items handled by the list.
 */
export interface ListSortEvent<T = any> {
	/**
	 * Absolute index the item occupied in the source container before the move.
	 * For nested trees this is the index within the parent's children collection.
	 */
	previousIndex: number;

	/**
	 * Absolute index the item occupies in the destination container after the move.
	 */
	currentIndex: number;

	/**
	 * The item that was moved.
	 */
	item: T;

	/**
	 * The destination container collection in its resulting order. For an in-list reorder
	 * this is the same collection that owned the item.
	 */
	items: ReadonlyArray<T>;

	/**
	 * `true` when the item was transferred from a different list (cross-list move),
	 * `false` for an in-list reorder.
	 */
	isTransfer: boolean;

	/**
	 * The `dragGroup` (or list identifier) of the source list. Equals `group` for an
	 * in-list reorder.
	 */
	previousGroup: string | null;

	/**
	 * The `dragGroup` (or list identifier) of the destination list.
	 */
	group: string | null;

	/**
	 * The source container collection in its resulting order. Only present when
	 * `isTransfer` is `true`.
	 */
	previousItems?: ReadonlyArray<T>;

	/**
	 * Nesting depth of the destination container (0 for the root collection).
	 */
	depth: number;

	/**
	 * The parent item that owns the destination container in a nested tree, or `null`
	 * when the destination is the root collection.
	 */
	parentItem: T | null;
}
