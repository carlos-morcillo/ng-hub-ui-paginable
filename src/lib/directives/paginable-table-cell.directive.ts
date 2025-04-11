import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
	selector: '[cellTpt], [paginableTableCell]',
	standalone: true
})
export class PaginableTableCellDirective {
	@Input({ required: true }) header!: string;
	constructor(public template: TemplateRef<any>) {}
}
