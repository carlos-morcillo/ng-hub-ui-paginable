import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[paginableTableExpandingRow]'
})
export class PaginableTableExpandingRowDirective {
	constructor(public templateRef: TemplateRef<any>) {}
}
