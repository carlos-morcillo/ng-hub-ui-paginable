import {
	ChangeDetectorRef,
	OnDestroy,
	Pipe,
	PipeTransform,
	inject
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginableTranslationService } from './services/paginable-translation.service';
import { equals, isDefined } from './utis';

@Pipe({
	name: 'translate',
	standalone: true,
	pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {
	private _ref = inject(ChangeDetectorRef);
	private _configSvc = inject(PaginableTranslationService);

	templateMatcher: RegExp = /{{\s?([^{}\s]*)\s?}}/g;

	value: string = '';
	lastKey: string | null = null;
	lastParams: any[] = [];

	translationSubscription: Subscription | undefined;

	updateValue(key: string, interpolateParams?: Object): void {
		const value = this.interpolateString(
			this._configSvc.getTranslation(key),
			interpolateParams
		);

		this.value = value !== undefined ? value : key;
		this.lastKey = key;
		this._ref.markForCheck();
	}

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
				this._configSvc.translationObserver.subscribe(() => {
					if (this.lastKey) {
						this.lastKey = null;
						this.updateValue(query, interpolateParams);
					}
					/* console.log(query);
					this.setValue(query, interpolateParams);
					return this.value ?? query; */
				});
		}

		return this.value;
	}

	setValue(query, interpolateParams) {
		this.value = this.interpolateString(
			this._configSvc.getTranslation(query),
			interpolateParams
		);
		//this._ref.markForCheck();
	}

	private interpolateString(expr: string, params?: any) {
		if (!params) {
			return expr;
		}

		return expr.replace(
			this.templateMatcher,
			(substring: string, b: string) => {
				let r = this.getValue(params, b);
				return isDefined(r) ? r : substring;
			}
		);
	}

	getValue(target: any, key: string): any {
		let keys = typeof key === 'string' ? key.split('.') : [key];
		key = '';
		do {
			key += keys.shift();
			if (
				isDefined(target) &&
				isDefined(target[key]) &&
				(typeof target[key] === 'object' || !keys.length)
			) {
				target = target[key];
				key = '';
			} else if (!keys.length) {
				target = undefined;
			} else {
				key += '.';
			}
		} while (keys.length);

		return target;
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
