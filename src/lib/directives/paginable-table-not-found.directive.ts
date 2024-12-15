import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[noDataTpt], [paginableTableNotFound]',
	standalone: true
})
export class PaginableTableNotFoundDirective {
	constructor(public template: TemplateRef<any>) {}
}
