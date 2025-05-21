import { NgClass, NgStyle } from '@angular/common';
import {
	Component,
	ElementRef,
	EmbeddedViewRef,
	HostListener,
	Input,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
	inject
} from '@angular/core';
import { PaginableTableDropdown } from '../../interfaces/paginable-table-dropdown';
import { HubIconComponent } from '../icon/icon.component';

@Component({
	selector: 'hub-table-dropdown, paginable-table-dropdown',

	standalone: true,
	imports: [NgClass, NgStyle, HubIconComponent],
	templateUrl: './paginable-table-dropdown.component.html',
	styleUrls: ['./paginable-table-dropdown.component.scss']
})
export class PaginableTableDropdownComponent<T = any> {
	private _elementRef = inject(ElementRef);

	@ViewChild('dropdownTpt') dropdownTpt!: TemplateRef<any>;

	private vcr = inject(ViewContainerRef);
	private embeddedView: EmbeddedViewRef<any> | null = null;
	private renderedElement: HTMLElement | null = null;

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

	@Input() appendTo: HTMLElement | 'body' | null = 'body';

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

	toggle() {
		if (this.shown) {
			this.close();
			return;
		}

		this.shown = true;

		const target =
			this.appendTo === 'body'
				? document.body
				: this.appendTo instanceof HTMLElement
					? this.appendTo
					: this._elementRef.nativeElement;

		// Crea la vista
		this.embeddedView = this.vcr.createEmbeddedView(this.dropdownTpt);
		this.embeddedView.detectChanges();

		const [element] = this.embeddedView.rootNodes as HTMLElement[];
		this.renderedElement = element;

		const button = this._elementRef.nativeElement.querySelector('button');
		const rect = button.getBoundingClientRect();

		Object.assign(element.style, {
			position: 'absolute',
			zIndex: '1050',
			top: `${rect.bottom + window.scrollY}px`,
			left: `${rect.left + window.scrollX}px`
		});

		target.appendChild(element);
	}

	/**
	 * Sets the "shown" property to false.
	 */
	close() {
		this.shown = false;

		if (this.embeddedView) {
			this.embeddedView.destroy();
			this.embeddedView = null;
		}

		if (this.renderedElement && this.renderedElement.parentElement) {
			this.renderedElement.parentElement.removeChild(
				this.renderedElement
			);
			this.renderedElement = null;
		}
	}
}
