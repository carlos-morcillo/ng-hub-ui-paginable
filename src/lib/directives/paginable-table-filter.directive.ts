import { Directive, TemplateRef, input } from '@angular/core';

@Directive({
	selector: '[filterTpt], [paginableTableFilter]',
	standalone: true
})
export class PaginableTableFilterDirective {
	readonly header = input.required<string>();

	constructor(public template: TemplateRef<any>) {}
}
