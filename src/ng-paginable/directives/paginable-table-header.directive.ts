import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
	selector: '[nbTableSorterHeader]'
})
export class NbTableSorterHeaderDirective {

	constructor(elem: ElementRef, renderer: Renderer2) {
		renderer.setStyle(elem.nativeElement, 'color', 'blue');
	}

}
