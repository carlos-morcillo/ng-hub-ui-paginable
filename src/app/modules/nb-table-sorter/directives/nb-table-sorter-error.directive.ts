import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[nbTableSorterError]'
})
export class NbTableSorterErrorDirective {

	constructor(
		public template: TemplateRef<any>
	) { }

}
