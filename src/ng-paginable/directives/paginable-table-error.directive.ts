import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[paginableTableError]'
})
export class PaginableTableErrorDirective {

	constructor(
		public template: TemplateRef<any>
	) { }

}
