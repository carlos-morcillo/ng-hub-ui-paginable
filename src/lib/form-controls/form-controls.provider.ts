import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { HUB_PAGINABLE_FORM_CONTROLS } from './form-controls.token';
import { HubPaginableFormControlsAdapter } from './form-controls.types';

/**
 * Registers a form-controls adapter so the table renders its inputs and selects
 * with the wired component library instead of native controls.
 *
 * ```ts
 * import { provideHubPaginableFormControls } from 'ng-hub-ui-paginable';
 * import { hubFormControlAdapter } from 'ng-hub-ui-forms';
 *
 * providers: [provideHubPaginableFormControls(hubFormControlAdapter)];
 * ```
 *
 * @param adapter Adapter implementation (e.g. `hubFormControlAdapter` from
 *                `ng-hub-ui-forms`).
 * @returns Environment providers to add to the application config.
 */
export function provideHubPaginableFormControls(adapter: HubPaginableFormControlsAdapter): EnvironmentProviders {
	return makeEnvironmentProviders([
		{
			provide: HUB_PAGINABLE_FORM_CONTROLS,
			useValue: adapter
		}
	]);
}
