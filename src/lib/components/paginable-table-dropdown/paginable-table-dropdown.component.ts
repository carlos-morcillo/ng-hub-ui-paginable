import {
	Component,
	ElementRef,
	HostListener,
	Input,
	inject
} from '@angular/core';
import { PaginableTableDropdown } from '../../interfaces/paginable-table-dropdown';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';

@Component({
	selector: 'hub-table-dropdown, paginable-table-dropdown',
	standalone: true,
	imports: [NgIf, NgFor, NgClass, NgStyle],
	templateUrl: './paginable-table-dropdown.component.html',
	styleUrls: ['./paginable-table-dropdown.component.scss']
})
export class PaginableTableDropdownComponent<T = any> {
	private _elementRef = inject(ElementRef);

	@Input() item: T | undefined;

	private _options: PaginableTableDropdown = { buttons: [] };
	@Input()
	get options(): PaginableTableDropdown {
		return this._options;
	}
	set options(v: PaginableTableDropdown) {
		this._options = {
			position: 'end',
			fill: 'clear',
			color: 'muted',
			...v
		};
		if (this._options.fill === 'clear') {
			this.buttonClass = 'btn text-' + (this._options.color ?? 'muted');
		} else {
			this.buttonClass =
				'btn ' +
				['btn', this._options.fill, this._options.color]
					.filter((o) => o)
					.join('-');
		}
	}

	@Input() disabled: boolean = false;

	buttonClass: string | null = null;
	shown: boolean = false;

	/**
	 * Checks if the clicked element is outside the component's native element and if the component is currently shown, and if so,
	 * it closes the component.
	 *
	 * @param event - Represents the event that triggered the clickOut function. It contains information about the event, such as
	 * the target element that was clicked.
	 */
	@HostListener('document:click', ['$event'])
	clickOut(event) {
		if (
			!this._elementRef.nativeElement.contains(event.target) &&
			this.shown
		) {
			this.close();
		}
	}

	/**
	 * Sets the "shown" property to false.
	 */
	close() {
		this.shown = false;
	}
}
