import {
	ChangeDetectorRef,
	OnDestroy,
	Pipe,
	PipeTransform,
	inject
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginableTranslationService } from '../services/paginable-translation.service';
import { equals, interpolateString, isDefined } from '../utils';

@Pipe({
	name: 'translate',
	standalone: true,
	pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
	private _ref = inject(ChangeDetectorRef);
	private _paginableTranslationSvc = inject(PaginableTranslationService);

	value: string = '';
	lastKey: string | null = null;
	lastParams: any[] = [];

	translationSubscription: Subscription | undefined;

	/**
	 * Updates the value of a key by interpolating the translation and marking for change detection.
	 *
	 * @param {string} key - a string representing the translation key. This key is used to retrieve the translation value from the
	 * translation service.
	 * @param {Object} [interpolateParams] - an optional object that contains key-value pairs used for interpolating dynamic values
	 * into the translated string. These values can be placeholders in the translation string that are replaced with actual values at runtime.
	 */
	updateValue(key: string, interpolateParams?: Object): void {
		const value = interpolateString(
			this._paginableTranslationSvc.getTranslation(key),
			interpolateParams
		);
		this.value = value !== undefined ? value : key;
		this.lastKey = key;
		this._ref.markForCheck();
	}

	/**
	 * Takes a query string and optional arguments, checks if the query and arguments have changed since the last call, parses the
	 * arguments if they are in string format, updates the value based on the query and arguments, and returns the value.
	 *
	 * @param {string} query - a string that represents the translation key or query that needs to be transformed.
	 * @param {any[]} args - a rest parameter, which means it can accept any number of arguments. In this case, it is used to pass
	 * additional parameters to the `transform` function. The `...args` syntax allows you to pass multiple arguments separated by
	 * commas, and they will be collected into
	 *
	 * @returns the value of the translation for the given query and arguments.
	 */
	transform(query: string, ...args: any[]): any {
		if (!query || !query.length) {
			return query;
		}

		// if we ask another time for the same key, return the last value
		if (equals(query, this.lastKey) && equals(args, this.lastParams)) {
			return this.value;
		}

		let interpolateParams: Object | undefined = undefined;
		if (isDefined(args[0]) && args.length) {
			if (typeof args[0] === 'string' && args[0].length) {
				// we accept objects written in the template such as {n:1}, {'n':1}, {n:'v'}
				// which is why we might need to change it to real JSON objects such as {"n":1} or {"n":"v"}
				let validArgs: string = args[0]
					.replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
					.replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
				try {
					interpolateParams = JSON.parse(validArgs);
				} catch (e) {
					throw new SyntaxError(
						`Wrong parameter in TranslatePipe. Expected a valid Object, received: ${args[0]}`
					);
				}
			} else if (typeof args[0] === 'object' && !Array.isArray(args[0])) {
				interpolateParams = args[0];
			}
		}

		// store the query, in case it changes
		this.lastKey = query;

		// store the params, in case they change
		this.lastParams = args;

		// set the value
		this.updateValue(query, interpolateParams);

		// if there is a subscription to onLangChange, clean it
		this._dispose();

		if (!this.translationSubscription) {
			this.translationSubscription =
				this._paginableTranslationSvc.translationObserver.subscribe(
					() => {
						if (this.lastKey) {
							this.lastKey = null;
							this.updateValue(query, interpolateParams);
						}
					}
				);
		}
		return this.value;
	}

	/**
	 * Clean any existing subscription to change events
	 */
	private _dispose(): void {
		if (typeof this.translationSubscription !== 'undefined') {
			this.translationSubscription.unsubscribe();
			this.translationSubscription = undefined;
		}
	}

	ngOnDestroy(): void {
		this._dispose();
	}
}
