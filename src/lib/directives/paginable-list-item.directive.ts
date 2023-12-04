import { Directive, TemplateRef } from '@angular/core';

@Directive({
	selector: '[listItemTpt]'
})
export class PaginableListItemDirective {
	constructor(public template: TemplateRef<any>) {}
}
