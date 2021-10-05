import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[paginableTableNotFound]'
})
export class PaginableTableNotFoundDirective {

	constructor(
		public template: TemplateRef<any>
	) { }

}
