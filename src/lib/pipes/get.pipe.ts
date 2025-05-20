import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'get',
	standalone: true
})
export class GetPipe implements PipeTransform {
	transform(value: any, path: string, defaultValue?: any): any {
		if (typeof path !== 'string') {
			return null;
		}
		return path
			.split('.')
			.reduce((a, c) => (a && a[c] ? a[c] : defaultValue || null), value);
	}
}
