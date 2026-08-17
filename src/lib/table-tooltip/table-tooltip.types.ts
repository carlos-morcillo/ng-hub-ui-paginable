/**
 * Live handle returned by {@link HubTableTooltipAdapter.attach}, used to update or
 * tear down a tooltip the table owns.
 */
export interface HubTableTooltipHandle {
	/** Updates the tooltip label. An empty string disables the tooltip. */
	update(text: string): void;
	/** Detaches the tooltip and releases its listeners. */
	destroy(): void;
}

/**
 * Optional, structurally-typed tooltip provider consumed by the table's own controls.
 *
 * The contract is declared here rather than imported so the shape is a contract and not
 * a coupling — the same reason `ng-hub-ui-badges` declares its own. `ng-hub-ui-utils`
 * ships a ready-made implementation (`hubTooltipAdapter`) that satisfies it.
 *
 * Opting in is deliberate, and not merely a dependency question: this package already
 * depends on `ng-hub-ui-utils`, so it could reach for the tooltip unasked. What it
 * cannot do unasked is require the stylesheet the tooltip needs
 * (`@use 'ng-hub-ui-utils/styles/tooltip';`). Switching every existing consumer would
 * have traded a plain native tooltip for an unstyled themed one, which is worse than
 * what they had.
 */
export interface HubTableTooltipAdapter {
	/**
	 * Attaches a tooltip to `host` with the given initial `text`.
	 * @param host - Element the tooltip describes.
	 * @param text - Initial label.
	 * @returns A handle to update or destroy the tooltip.
	 */
	attach(host: HTMLElement, text: string): HubTableTooltipHandle;
}
