import { NgClass, NgStyle } from '@angular/common';
import {
  Component,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
  viewChild
} from '@angular/core';
import { TableRowEvent } from '../../interfaces';
import { PaginableTableDropdown } from '../../interfaces/paginable-table-dropdown';
import { UnwrapAsyncPipe } from 'ng-hub-ui-utils';
import { HubIconComponent } from '../icon/icon.component';

@Component({
	selector: 'hub-table-dropdown, paginable-table-dropdown',

	standalone: true,
	imports: [NgClass, NgStyle, HubIconComponent, UnwrapAsyncPipe],
	templateUrl: './paginable-table-dropdown.component.html',
	styleUrls: ['./paginable-table-dropdown.component.scss']
})
export class PaginableTableDropdownComponent<T = any> {
	#elementRef = inject(ElementRef);

	readonly dropdownTpt = viewChild.required<TemplateRef<any>>('dropdownTpt');

	private vcr = inject(ViewContainerRef);
	private embeddedView: EmbeddedViewRef<any> | null = null;
	private renderedElement: HTMLElement | null = null;

	readonly row = input<TableRowEvent<T>>();

	#options: PaginableTableDropdown = { buttons: [] };

	// TODO: Skipped for migration because:
	//  Accessor inputs cannot be migrated as they are too complex.
	@Input()
	get options(): PaginableTableDropdown {
		return this.#options;
	}
	set options(v: PaginableTableDropdown) {
		this.#options = {
			position: 'end',
			fill: 'clear',
			color: 'muted',
			...v
		};
		if (this.#options.fill === 'clear') {
			this.buttonClass = 'btn text-' + (this.#options.color ?? 'muted');
		} else {
			this.buttonClass =
				'btn ' +
				['btn', this.#options.fill, this.#options.color]
					.filter((o) => o)
					.join('-');
		}
	}

	readonly appendTo = input<HTMLElement | 'body' | null>('body');

	readonly disabled = input<boolean>(false);

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
	clickOut(event: MouseEvent) {
		if (
			!this.#elementRef.nativeElement.contains(event.target) &&
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

		const appendTo = this.appendTo();
		const target =
			appendTo === 'body'
				? document.body
				: appendTo instanceof HTMLElement
					? appendTo
					: this.#elementRef.nativeElement;

		// Crea la vista
		this.embeddedView = this.vcr.createEmbeddedView(this.dropdownTpt());
		this.embeddedView.detectChanges();

		const [element] = this.embeddedView.rootNodes as HTMLElement[];
		this.renderedElement = element;

		const button = this.#elementRef.nativeElement.querySelector('button');
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
