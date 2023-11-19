import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[typeaheadFooter]'
})
export class TypeaheadFooterDirective {

	constructor(public template: TemplateRef<any>) { }

}
