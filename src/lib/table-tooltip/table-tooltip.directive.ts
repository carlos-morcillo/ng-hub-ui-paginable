import { Directive, ElementRef, effect, inject, input, OnDestroy } from '@angular/core';
import { HUB_TABLE_TOOLTIP_ADAPTER } from './table-tooltip.token';
import { HubTableTooltipHandle } from './table-tooltip.types';

/**
 * Puts a tooltip on a control the table draws itself, and makes sure that control still
 * has a name.
 *
 * Internal: applied by the table's own templates to row actions and dropdown controls,
 * which a consumer configures through `headers` and therefore cannot restyle from the
 * outside. Two jobs, and the second is the one that is easy to lose:
 *
 * 1. **The tooltip.** With an adapter registered through `provideHubTableTooltip` the
 *    label goes to the themed tooltip; without one it stays on the native `title`,
 *    exactly as before, so nothing changes for an application that has not opted in.
 *
 * 2. **The accessible name.** These buttons are usually a bare icon, and `title` was
 *    quietly serving as their name. Handing the text to a tooltip and stopping there
 *    would have left a screen reader with an unlabelled button — a regression no
 *    sighted review would catch. So the text is mirrored to `aria-label`, but *only*
 *    when the control renders no text of its own: where a visible label exists it is
 *    the name, and overriding it with different words is how you break WCAG 2.5.3
 *    (Label in Name) while believing you improved things.
 */
@Directive({
	selector: '[hubTableTooltip]'
})
export class HubTableTooltipDirective implements OnDestroy {
	/** Label for the control. Empty, null or undefined means no tooltip and no name. */
	readonly text = input<string | null | undefined>('', { alias: 'hubTableTooltip' });

	private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly adapter = inject(HUB_TABLE_TOOLTIP_ADAPTER, { optional: true });

	private handle: HubTableTooltipHandle | null = null;

	constructor() {
		effect(() => {
			const element = this.host.nativeElement;
			const text = (this.text() ?? '').toString().trim();

			this.applyTooltip(element, text);
			this.applyAccessibleName(element, text);
		});
	}

	/** @inheritDoc */
	ngOnDestroy(): void {
		this.handle?.destroy();
		this.handle = null;
	}

	/**
	 * Routes the label to the themed tooltip or to the native attribute.
	 *
	 * Never both: `title` alongside an attached tooltip shows the browser's own on top
	 * of the themed one, a second later and in a different place.
	 *
	 * @param element - The control being described.
	 * @param text - Label, already trimmed.
	 */
	private applyTooltip(element: HTMLElement, text: string): void {
		if (!this.adapter) {
			if (text) {
				element.setAttribute('title', text);
			} else {
				element.removeAttribute('title');
			}

			return;
		}

		if (!text) {
			this.handle?.destroy();
			this.handle = null;

			return;
		}

		if (this.handle) {
			this.handle.update(text);
		} else {
			this.handle = this.adapter.attach(element, text);
		}
	}

	/**
	 * Names the control when nothing inside it does.
	 *
	 * Read from the DOM rather than from configuration: whether a label is rendered
	 * depends on which fields the consumer filled in, and the element already knows.
	 *
	 * @param element - The control being described.
	 * @param text - Label, already trimmed.
	 */
	private applyAccessibleName(element: HTMLElement, text: string): void {
		const rendersItsOwnText = !!element.textContent?.trim();

		if (!text || rendersItsOwnText) {
			element.removeAttribute('aria-label');

			return;
		}

		element.setAttribute('aria-label', text);
	}
}
