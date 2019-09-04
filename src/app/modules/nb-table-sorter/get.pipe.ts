import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'get'
})
export class GetPipe implements PipeTransform {

	transform(value: any, path: string, defaultValue?: any): any {
		return path.split('.').reduce((a, c) => (a && a[c] ? a[c] : (defaultValue || null)), value);
	}

}
