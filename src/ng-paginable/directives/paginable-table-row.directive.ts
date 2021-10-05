import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[nbTableSorterRow]'
})
export class NbTableSorterRowDirective {

	constructor(public template: TemplateRef<any>) { }

}
