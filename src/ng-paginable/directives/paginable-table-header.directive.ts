import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
	selector: '[paginableTableHeader]'
})
export class PaginableTableHeaderDirective {

	constructor(elem: ElementRef, renderer: Renderer2) {
		renderer.setStyle(elem.nativeElement, 'color', 'blue');
	}

}
