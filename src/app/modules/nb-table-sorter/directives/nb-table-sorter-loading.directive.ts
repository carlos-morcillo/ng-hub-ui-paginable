import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[nbTableSorterLoading]'
})
export class NbTableSorterLoadingDirective {

	constructor(
		public template: TemplateRef<any>
	) { }

}
