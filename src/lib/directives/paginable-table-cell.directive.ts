import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
	selector: '[paginableTableCell]'
})
export class PaginableTableCellDirective {

	@Input() header!: string;

	constructor(public template: TemplateRef<any>) { }

}
