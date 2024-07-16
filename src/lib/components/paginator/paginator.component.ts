import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { PaginableTablePagination } from '../../interfaces/paginable-table-pagination';
import { PaginableService } from '../../services/paginable.service';

@Component({
	selector: 'paginable-table-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss'],
	standalone: true,
	imports: [NgIf]
})
export class PaginatorComponent {
	#configSvc = inject(PaginableService);
	tableHeader: any;

	@Input() pagination!: PaginableTablePagination | null;
	@Output() onPageClick = new EventEmitter<number>();

	mapping: any = this.#configSvc.mapping;

	get currentPage(): number {
		return (
			this.pagination?.[this.mapping.currentPage] ||
			this.pagination?.currentPage
		);
	}

	get lastPage(): number {
		return (
			this.pagination?.[this.mapping.lastPage] ||
			this.pagination?.lastPage
		);
	}

	/**
	 * Triggers an event with the page number when a page is clicked.
	 * @param {number} page - Takes a `page` parameter, which is a number representing the page that was clicked. This function emits
	 * the `page` value using a `Subject` called `onPageClick`.
	 */
	pageClick(page: number) {
		this.onPageClick.next(page);
	}

	// scrollToTableHeader() {
	// 	debugger;
	// 	if (this.tableHeader && this.tableHeader.nativeElement) {
	// 		this.tableHeader.nativeElement.scrollIntoView({
	// 			behavior: 'smooth',
	// 			block: 'start'
	// 		});
	// 	}
	// }
}
