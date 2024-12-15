import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[loadingTpt], [paginableTableLoading]',
	standalone: true
})
export class PaginableTableLoadingDirective {
	constructor(public template: TemplateRef<any>) {}
}
