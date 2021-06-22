import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
	selector: '[nbTableSorterFilter]'
})
export class NbTableSorterFilterDirective {

	@Input() header!: string;

	constructor(public template: TemplateRef<any>) { }

}
