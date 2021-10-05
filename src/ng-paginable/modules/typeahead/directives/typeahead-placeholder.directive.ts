import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[typeaheadPlaceholder]'
})
export class TypeaheadPlaceholderDirective {

	constructor(public template: TemplateRef<any>) { }

}
