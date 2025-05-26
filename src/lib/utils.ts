/**
 * Determines if two objects or two values are equivalent.
 *
 * Two objects or values are considered equivalent if at least one of the following is true:
 *
 * * Both objects or values pass `===` comparison.
 * * Both objects or values are of the same type and all of their properties are equal by
 *   comparing them with `equals`.
 *
 * @param o1 Object or value to compare.
 * @param o2 Object or value to compare.
 * @returns true if arguments are equal.
 */
export function equals(o1: any, o2: any): boolean {
	if (o1 === o2) {
		return true;
	}
	if (o1 === null || o2 === null) {
		return false;
	}
	if (o1 !== o1 && o2 !== o2) {
		return true;
	} // NaN === NaN
	let t1 = typeof o1,
		t2 = typeof o2,
		length: number,
		key: any,
		keySet: any;
	if (t1 == t2 && t1 == 'object') {
		if (Array.isArray(o1)) {
			if (!Array.isArray(o2)) {
				return false;
			}
			if ((length = o1.length) == o2.length) {
				for (key = 0; key < length; key++) {
					if (!equals(o1[key], o2[key])) {
						return false;
					}
				}
				return true;
			}
		} else {
			if (Array.isArray(o2)) {
				return false;
			}
			keySet = Object.create(null);
			for (key in o1) {
				if (!equals(o1[key], o2[key])) {
					return false;
				}
				keySet[key] = true;
			}
			for (key in o2) {
				if (!(key in keySet) && typeof o2[key] !== 'undefined') {
					return false;
				}
			}
			return true;
		}
	}
	return false;
}

/**
 * Checks if a value is defined and not null.
 *
 * @param {any} value - is of type `any`, which means it can accept any data type.
 *
 * @returns a boolean value.
 */
export function isDefined(value: any): boolean {
	return typeof value !== 'undefined' && value !== null;
}

/**
 * Checks if the given item is an object and not an array.
 *
 * @param {any} item - is of type "any", which means it can be any data type.
 *
 * @returns a boolean value.
 */
export function isObject(item: any): boolean {
	return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Recursively merges two objects, combining their properties into a new object.
 *
 * @param {any} target - is the object that you want to merge the `source` object into.
 * @param {any} source - is an object that contains the properties and values that you want to merge into the `target` object.
 *
 * @returns the merged object, which is the result of merging the `target` and `source` objects.
 */
export function mergeDeep(target: any, source: any): any {
	let output = Object.assign({}, target);
	if (isObject(target) && isObject(source)) {
		Object.keys(source).forEach((key: any) => {
			if (isObject(source[key])) {
				if (!(key in target)) {
					Object.assign(output, { [key]: source[key] });
				} else {
					output[key] = mergeDeep(target[key], source[key]);
				}
			} else {
				Object.assign(output, { [key]: source[key] });
			}
		});
	}
	return output;
}

/**
 * Generates a unique ID of a specified length by randomly selecting characters from a predefined set of characters.
 *
 * @param {number} length - is the desired length of the generated unique ID.
 *
 * @returns a unique id string.
 */
export function generateUniqueId(length: number): string {
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let result = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charactersLength);
		result += characters.charAt(randomIndex);
	}

	return result;
}

/**
 * Replaces placeholders in a string with corresponding values from a given object.
 *
 * @param {string} expr - a string that represents the expression to be interpolated. It may contain
 * placeholders that will be replaced with values from the `params` object.
 * @param {any} [params] - an optional object that contains the values to be interpolated into the `expr`
 * string. It is used to replace placeholders in the `expr` string with actual values.
 *
 * @returns returns the interpolated string. If `params` is not provided, it returns the original
 * `expr` string. If `params` is provided, it replaces placeholders in the `expr` string with corresponding values from `params`
 * and returns the interpolated string.
 */
export function interpolateString(
	expr: string = '',
	params: any = {},
	templateMatcher: RegExp = /{{\s?([^{}\s]*)\s?}}/g
) {
	if (!params) {
		return expr;
	}

	return expr.replace(templateMatcher, (substring: string, b: string) => {
		let r = getValue(params, b);
		return isDefined(r) ? r : substring;
	});
}

/**
 * Retrieves the value of a nested property from an object using dot notation.
 *
 * @param {any} target - the object from which you want to retrieve a value.
 * @param {string} key - a string that represents the property or nested properties of the `target` object that you want to
 * retrieve the value from. The `key` can be a single property name or a dot-separated string representing a nested property path.
 *
 * @returns the value of the specified key in the target object.
 */
export function getValue(target: any, key: string): any {
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
