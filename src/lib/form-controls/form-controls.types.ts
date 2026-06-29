import { ViewContainerRef } from '@angular/core';

/** Kind of primitive control the table needs to render. */
export type HubPaginableControlKind = 'input' | 'select';

/** A `{ value, label }` option for select-kind controls. */
export interface HubPaginableControlOption {
	value: unknown;
	label: string;
}

/**
 * Normalized, framework-neutral description of a single table control. The table
 * speaks only this shape; the adapter maps it onto whatever component library is
 * wired (e.g. `ng-hub-ui-forms`).
 */
export interface HubPaginableControlConfig {
	/** Whether to render a text-like input or a select. */
	kind: HubPaginableControlKind;
	/** Initial value. */
	value: unknown;
	/** Native input type for `kind: 'input'` (e.g. `text`, `number`, `date`). */
	type?: string;
	/** Placeholder text. */
	placeholder?: string;
	/** Accessible label. */
	ariaLabel?: string;
	/** Extra CSS class forwarded to the rendered control. */
	cssClass?: string;
	/** Options for `kind: 'select'`. */
	options?: ReadonlyArray<HubPaginableControlOption>;
	/** Called whenever the user changes the control value. */
	onValueChange: (value: unknown) => void;
}

/** Live handle to a control created by a {@link HubPaginableFormControlsAdapter}. */
export interface HubPaginableControlHandle {
	/** Pushes a new value into the control (external updates). */
	setValue(value: unknown): void;
	/** Destroys the control and releases its resources. */
	destroy(): void;
}

/**
 * Optional, structurally-typed adapter that renders the table's primitive
 * controls with a richer component set.
 *
 * Defined here (not imported) so `ng-hub-ui-paginable` keeps **zero hard
 * dependency** on `ng-hub-ui-forms`: with no adapter the table renders native
 * `<input>` / `<select>`; with one, every control upgrades automatically.
 * `ng-hub-ui-forms` ships a ready-made implementation (`hubFormControlAdapter`).
 */
export interface HubPaginableFormControlsAdapter {
	/**
	 * Creates a control inside `container` from the given `config`.
	 * @returns A handle to update or destroy the control.
	 */
	create(container: ViewContainerRef, config: HubPaginableControlConfig): HubPaginableControlHandle;
}
