import { InjectionToken } from '@angular/core';
import { HubTableTooltipAdapter } from './table-tooltip.types';

/**
 * Injection token resolving the optional tooltip adapter used by the table's row
 * actions and dropdowns.
 *
 * Inject it with `{ optional: true }`; a `null` value means "use the native `title`
 * fallback". Register it through {@link provideHubTableTooltip}.
 */
export const HUB_TABLE_TOOLTIP_ADAPTER = new InjectionToken<HubTableTooltipAdapter>('HUB_TABLE_TOOLTIP_ADAPTER');
