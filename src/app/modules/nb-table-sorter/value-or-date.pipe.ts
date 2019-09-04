import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'valueOrDate'
})
export class ValueOrDatePipe implements PipeTransform {
	transform(value: any, format?: string): any {
		return value;
		/* try {
			const date = moment(value);

			if (date.isValid()) {
				return (format) ? date.format(format) : date.format('YYYY-MM-DD HH:mm:ss');
			} else {
				return (typeof value === 'object') ? JSON.stringify(value) : value;
			}
		} catch (error) {
			return value;
		} */
	}
}
