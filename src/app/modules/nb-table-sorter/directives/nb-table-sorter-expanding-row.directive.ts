import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[nbTableSorterExpandingRow]'
})
export class NbTableSorterExpandingRowDirective {

	constructor(public template: TemplateRef<any>) { }

}
