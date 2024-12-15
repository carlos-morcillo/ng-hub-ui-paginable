import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[errorTpt], [paginableTableError]',
	standalone: true
})
export class PaginableTableErrorDirective {
	constructor(public template: TemplateRef<any>) {}
}
