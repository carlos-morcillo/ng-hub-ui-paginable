import { Component, OnInit } from '@angular/core';
import { MockedUsersService } from './mocked-users.service';
declare var require: any;
const packageJson = require('../../package.json');

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	items: any[];
	version: string = packageJson.version;

	constructor(
		private _mockedUsersSvc: MockedUsersService
	) { }

	ngOnInit(): void {
		setTimeout(() => {
			this.items = this._mockedUsersSvc.items;
		}, 2048);
	}
}
