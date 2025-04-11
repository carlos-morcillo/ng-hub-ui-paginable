import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
	selector: '[headerTpt], [paginableTableHeader]',
	standalone: true
})
export class PaginableTableHeaderDirective {
	@Input({ required: true }) header!: string;
	constructor(public template: TemplateRef<any>) {}
}
