import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { HubTableTooltipDirective } from './table-tooltip.directive';
import { provideHubTableTooltip } from './table-tooltip.provider';
import { HubTableTooltipAdapter, HubTableTooltipHandle } from './table-tooltip.types';

/** Records what an adapter would have been asked to draw. */
class RecordingAdapter implements HubTableTooltipAdapter {
	readonly attached: { host: HTMLElement; text: string }[] = [];
	readonly updates: string[] = [];
	destroyed = 0;

	attach(host: HTMLElement, text: string): HubTableTooltipHandle {
		this.attached.push({ host, text });

		return {
			update: (next: string) => this.updates.push(next),
			destroy: () => (this.destroyed += 1)
		};
	}
}

@Component({
	standalone: true,
	imports: [HubTableTooltipDirective],
	template: `
		<button id="icon-only" [hubTableTooltip]="tooltip()"><i class="icon"></i></button>
		<button id="with-label" [hubTableTooltip]="tooltip()"><span>Edit</span></button>
		<button id="untooltipped" [hubTableTooltip]="''"><i class="icon"></i></button>
	`
})
class HostComponent {
	readonly tooltip = signal('Rectify the invoice');
}

function setup(adapter?: HubTableTooltipAdapter) {
	TestBed.configureTestingModule({
		imports: [HostComponent],
		providers: adapter ? [provideHubTableTooltip(adapter)] : []
	});

	const fixture = TestBed.createComponent(HostComponent);
	fixture.detectChanges();

	return {
		fixture,
		button: (id: string) => fixture.nativeElement.querySelector(`#${id}`) as HTMLElement
	};
}

describe('HubTableTooltipDirective', () => {
	/**
	 * An application that has not opted in must see exactly what it saw before: the table
	 * cannot require `ng-hub-ui-utils/styles/tooltip` on its behalf, and a themed tooltip
	 * without its stylesheet is worse than the native one it replaced.
	 */
	describe('without an adapter', () => {
		it('keeps the native title, as before', () => {
			const { button } = setup();

			expect(button('icon-only').getAttribute('title')).toBe('Rectify the invoice');
		});

		it('writes no title when there is no text', () => {
			const { button } = setup();

			expect(button('untooltipped').hasAttribute('title')).toBe(false);
		});
	});

	describe('with an adapter', () => {
		it('hands the label to the adapter and drops the native attribute', () => {
			const adapter = new RecordingAdapter();
			const { button } = setup(adapter);

			expect(adapter.attached.map((a) => a.text)).toContain('Rectify the invoice');
			expect(button('icon-only').hasAttribute('title')).toBe(false);
		});

		it('never attaches a tooltip with no text', () => {
			const adapter = new RecordingAdapter();
			setup(adapter);

			expect(adapter.attached.every((a) => a.text.length > 0)).toBe(true);
		});

		it('updates the existing tooltip rather than stacking another', () => {
			const adapter = new RecordingAdapter();
			const { fixture } = setup(adapter);
			const attachedFirst = adapter.attached.length;

			fixture.componentInstance.tooltip.set('Send the invoice');
			fixture.detectChanges();

			expect(adapter.attached.length).toBe(attachedFirst);
			expect(adapter.updates).toContain('Send the invoice');
		});
	});

	/**
	 * The half of this that a sighted review cannot catch. These buttons are usually a
	 * bare icon and `title` was quietly acting as their name; moving the text to a
	 * tooltip and stopping there leaves a screen reader with an unlabelled button.
	 */
	describe('accessible name', () => {
		it('names a control that renders nothing but an icon', () => {
			const { button } = setup(new RecordingAdapter());

			expect(button('icon-only').getAttribute('aria-label')).toBe('Rectify the invoice');
		});

		/**
		 * And leaves alone one that names itself. Overriding a visible label with
		 * different words is how WCAG 2.5.3 (Label in Name) gets broken by someone
		 * convinced they were improving accessibility.
		 */
		it('leaves a control that already shows its own text unnamed', () => {
			const { button } = setup(new RecordingAdapter());

			expect(button('with-label').hasAttribute('aria-label')).toBe(false);
		});

		it('adds no name when there is no text to give', () => {
			const { button } = setup(new RecordingAdapter());

			expect(button('untooltipped').hasAttribute('aria-label')).toBe(false);
		});
	});
});
