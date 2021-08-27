import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[typeaheadHeader]'
})
export class TypeaheadHeaderDirective {

	constructor(public template: TemplateRef<any>) { }

}
