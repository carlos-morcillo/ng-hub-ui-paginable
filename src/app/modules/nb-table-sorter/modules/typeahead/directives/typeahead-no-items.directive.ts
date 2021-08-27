import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[typeaheadNoItems]'
})
export class TypeaheadNoItemsDirective {

	constructor(public template: TemplateRef<any>) { }

}
