import { Component, input, model } from '@angular/core';

@Component({
	selector: 'hub-paginator, paginable-table-paginator',
	standalone: true,
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss']
})
/**
 * Component for handling pagination controls in a table or list throughout the library.
 * It provides a user interface for navigating through pages of data.
 *
 * @export
 * @class PaginatorComponent
 */
export class PaginatorComponent {
	/**
	 * The current page number.
	 *
	 * @type {(number)}
	 * @memberof PaginatorComponent
	 */
	readonly page = model<number>(1);
	/**
	 * The total number of pages available.
	 *
	 * @type {(number | null)}
	 * @memberof PaginatorComponent
	 */
	readonly numberOfPages = input<number | null>();
}
