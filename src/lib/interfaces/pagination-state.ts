/**
 * Represents the full state of a paginated collection of items.
 *
 * This interface is intended to encapsulate both metadata and data required
 * for paginating UI components, either in client-side or server-side scenarios.
 *
 * @template T - The type of items contained in the paginated data array.
 */
export interface PaginationState<T = any> {
	/**
	 * Current page number (1-based index).
	 * Must be a positive integer or `null` if undefined.
	 */
	page: number | null;

	/**
	 * Number of items to display per page.
	 * Must be a positive integer or `null` if undefined.
	 */
	perPage: number | null;

	/**
	 * Total number of items available across all pages.
	 * Can be `null` if the total is not yet known (e.g., in infinite scroll).
	 */
	totalItems: number | null;

	/**
	 * The array of data items corresponding to the current page.
	 * Use `null` if the data has not been fetched yet.
	 */
	data: ReadonlyArray<T> | null;
}
