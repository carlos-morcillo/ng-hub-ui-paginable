import { InjectionToken } from '@angular/core';
import { HubPaginableFormControlsAdapter } from './form-controls.types';

/**
 * Injection token resolving the optional form-controls adapter used by the table.
 *
 * Inject it with `{ optional: true }`; a `null` value means "render native
 * controls". Register it through {@link provideHubPaginableFormControls}.
 */
export const HUB_PAGINABLE_FORM_CONTROLS = new InjectionToken<HubPaginableFormControlsAdapter>('HUB_PAGINABLE_FORM_CONTROLS');
