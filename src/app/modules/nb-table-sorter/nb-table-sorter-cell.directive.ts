import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
	selector: '[nbTableSorterCell]'
})
export class NbTableSorterCellDirective {

	@Input() header!: string;

	constructor(public template: TemplateRef<any>) { }

}
