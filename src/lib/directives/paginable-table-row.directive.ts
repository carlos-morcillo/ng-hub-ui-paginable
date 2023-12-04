import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[paginableTableRow]'
})
export class PaginableTableRowDirective {

	constructor(public template: TemplateRef<any>) { }

}
