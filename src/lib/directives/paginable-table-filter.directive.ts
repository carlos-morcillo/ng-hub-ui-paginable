import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
	selector: '[filterTpt], [paginableTableFilter]',
	standalone: true
})
export class PaginableTableFilterDirective {
	@Input() header!: string;

	constructor(public template: TemplateRef<any>) {}
}
