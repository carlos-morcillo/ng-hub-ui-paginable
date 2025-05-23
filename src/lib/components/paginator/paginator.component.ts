import { Component, input, model } from '@angular/core';

@Component({
	selector: 'hub-paginator, paginable-table-paginator',
	standalone: true,
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
	readonly page = model<number>(1);
	readonly numberOfPages = input<number | null>();
}
