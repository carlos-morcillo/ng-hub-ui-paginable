import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[typeaheadOption]'
})
export class TypeaheadOptionDirective {

	constructor(public template: TemplateRef<any>) { }

}
