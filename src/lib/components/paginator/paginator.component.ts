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
	private _configSvc = inject(PaginableService);

	@Input() pagination!: PaginableTablePagination | null;
	@Output() onPageClick = new EventEmitter<number>();

	mapping: any = this._configSvc.mapping;

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

	pageClick(page: number) {
		this.onPageClick.next(page);
	}
}
