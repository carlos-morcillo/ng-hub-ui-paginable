import { afterNextRender, Directive, effect, inject, input, OnDestroy, output, ViewContainerRef } from '@angular/core';
import { HUB_PAGINABLE_FORM_CONTROLS } from './form-controls.token';
import { HubPaginableControlHandle, HubPaginableControlKind, HubPaginableControlOption } from './form-controls.types';

/**
 * Renders a table control through the optional {@link HUB_PAGINABLE_FORM_CONTROLS}
 * adapter.
 *
 * Place it on an `<ng-container>` inside the branch that runs only when an adapter
 * is present; the native `<input>` / `<select>` stays in the `@else` branch as the
 * zero-dependency fallback. The created control is inserted as a sibling of the
 * anchor, kept in sync with the `value` input, and torn down on destroy.
 */
@Directive({
	selector: '[hubPaginableControl]'
})
export class HubPaginableControlDirective implements OnDestroy {
	/** Kind of control to render. */
	readonly kind = input.required<HubPaginableControlKind>({ alias: 'hubPaginableControl' });

	/** Current value (kept in sync with the rendered control). */
	readonly value = input<unknown>('');

	/** Native input type for `kind: 'input'`. */
	readonly controlType = input<string>('text');

	/** Placeholder text. */
	readonly placeholder = input<string>('');

	/** Accessible label. */
	readonly ariaLabel = input<string>('');

	/** Extra CSS class forwarded to the control. */
	readonly cssClass = input<string>('');

	/** Options for `kind: 'select'`. */
	readonly options = input<ReadonlyArray<HubPaginableControlOption>>([]);

	/** Emits whenever the user changes the control value. */
	readonly valueChange = output<unknown>();

	private readonly vcr = inject(ViewContainerRef);
	private readonly adapter = inject(HUB_PAGINABLE_FORM_CONTROLS, { optional: true });

	private handle: HubPaginableControlHandle | null = null;
	private lastEmitted: unknown = Symbol('uninitialized');

	constructor() {
		afterNextRender(() => this.render());

		effect(() => {
			const value = this.value();
			// Skip echoing the user's own change back into the control (caret jumps).
			if (this.handle && value !== this.lastEmitted) {
				this.handle.setValue(value);
			}
		});
	}

	ngOnDestroy(): void {
		this.handle?.destroy();
		this.handle = null;
	}

	/** Creates the control via the adapter (no-op when no adapter is provided). */
	private render(): void {
		if (!this.adapter || this.handle) {
			return;
		}

		this.handle = this.adapter.create(this.vcr, {
			kind: this.kind(),
			value: this.value(),
			type: this.controlType(),
			placeholder: this.placeholder(),
			ariaLabel: this.ariaLabel(),
			cssClass: this.cssClass(),
			options: this.options(),
			onValueChange: (value) => {
				this.lastEmitted = value;
				this.valueChange.emit(value);
			}
		});
	}
}
