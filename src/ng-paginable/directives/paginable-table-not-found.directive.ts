import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[nbTableSorterNotFound]'
})
export class NbTableSorterNotFoundDirective {

	constructor(
		public template: TemplateRef<any>
	) { }

}
