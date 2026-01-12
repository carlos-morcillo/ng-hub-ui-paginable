import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'th[resizable]',
	templateUrl: './resizable.component.html',
	styleUrls: ['./resizable.component.scss']
})
/**
 * Component for creating resizable table headers.
 * Applied to `th` elements with the `resizable` attribute.
 *
 * @export
 * @class ResizableComponent
 */
export class ResizableComponent {
	/**
	 * The width of the resizable element in pixels.
	 *
	 * @type {(number | null)}
	 * @memberof ResizableComponent
	 */
	@HostBinding('style.width.px')
	width: number | null = null;

	onResize(width: any) {
		this.width = width;
	}
}
