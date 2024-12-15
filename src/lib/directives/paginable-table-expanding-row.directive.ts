import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[expandingRowTpt], [paginableTableExpandingRow]',
	standalone: true
})
export class PaginableTableExpandingRowDirective {
	constructor(public templateRef: TemplateRef<any>) {}
}
