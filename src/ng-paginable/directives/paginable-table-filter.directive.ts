import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
	selector: '[paginableTableFilter]'
})
export class PaginableTableFilterDirective {

	@Input() header!: string;

	constructor(public template: TemplateRef<any>) { }

}
