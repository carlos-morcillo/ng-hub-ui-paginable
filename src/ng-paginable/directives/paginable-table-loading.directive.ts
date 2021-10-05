import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[paginableTableLoading]'
})
export class PaginableTableLoadingDirective {

	constructor(
		public template: TemplateRef<any>
	) { }

}
