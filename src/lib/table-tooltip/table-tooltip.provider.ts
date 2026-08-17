import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { HUB_TABLE_TOOLTIP_ADAPTER } from './table-tooltip.token';
import { HubTableTooltipAdapter } from './table-tooltip.types';

/**
 * Registers a tooltip adapter so the table's row actions and dropdown controls render
 * the rich hub-ui tooltip instead of the native `title` fallback.
 *
 * Remember the stylesheet the tooltip needs, or it renders unstyled:
 * `@use 'ng-hub-ui-utils/styles/tooltip';`
 *
 * ```ts
 * import { provideHubTableTooltip } from 'ng-hub-ui-paginable';
 * import { hubTooltipAdapter } from 'ng-hub-ui-utils';
 *
 * providers: [provideHubTableTooltip(hubTooltipAdapter)];
 * ```
 *
 * @param adapter Tooltip adapter implementation (e.g. `hubTooltipAdapter` from
 *                `ng-hub-ui-utils`).
 * @returns Environment providers to add to the application config.
 */
export function provideHubTableTooltip(adapter: HubTableTooltipAdapter): EnvironmentProviders {
	return makeEnvironmentProviders([
		{
			provide: HUB_TABLE_TOOLTIP_ADAPTER,
			useValue: adapter
		}
	]);
}
