import { Component, OnInit } from '@angular/core';
import { MockedUsersService } from './mocked-users.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	items: any[];

	constructor(
		private _mockedUsersSvc: MockedUsersService
	) { }

	ngOnInit(): void {
		setTimeout(() => {
			this.items = this._mockedUsersSvc.items;
		}, 2048);
	}
}
