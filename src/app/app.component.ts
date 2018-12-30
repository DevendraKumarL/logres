import { Component } from '@angular/core';
import { PNotifyService } from './services/pnotify.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { LogresWebService } from './services/logresweb.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	public pnotify: any;

	public appVisitFirst: boolean;

	private searchSubject = new Subject<string>();

	public queryVal: string = "";

	constructor(
		public pnotifyService: PNotifyService,
		public userService: UserService,
		public router: Router,
		public logresWebService: LogresWebService) {

		this.pnotify = this.pnotifyService.getPNotify();

		this.appVisitFirst = this.userService.firstAppVisit();
		console.log('appVisitFirst: ', this.appVisitFirst);
		if (this.appVisitFirst) {
			this.pnotify.alert({
				title: 'Welcome to logres!',
				type: 'info',
				icon: false
			});
		}

		console.log("profileName: ", this.userService.profileName);

		this.searchSubject
			.asObservable()
			.debounceTime(300)
			.distinctUntilChanged()
			.subscribe(value => {
				console.log("subscribe value: " , value);
				this.search(value);
			});
	}

	logout() {
		this.logresWebService.logout().subscribe((response) => {
			console.log("logout() :: Success response: ", response);
			this.logresWebService.sendingReq = false;
			this.pnotify.closeAll();
			if (response['success'] === true) {
				this.userService.logout();
				this.pnotify.alert({
					text: 'Logged out successfully',
					type: 'notice'
				});
				this.router.navigate(['/']);
				return;
			}
		}, (errResponse) => {
			console.log("logout() :: Error response: ", errResponse);
			this.logresWebService.sendingReq = false;
			this.pnotify.closeAll();
			this.userService.logout();
			this.pnotify.alert({
				text: 'Logged out with errors',
				type: 'notice'
			});
			this.router.navigate(['/']);
			return;
		});
	}

	search(queryValue: string) {
		if (queryValue.length == 0 || queryValue.trim().length == 0) {
			this.logresWebService.userSearchData = [];
			return;
		}

		this.logresWebService.search(queryValue).subscribe((response) => {
			console.log("search() :: Success response: ", response);
			this.logresWebService.userSearchData = [];
			if (response['data'] !== null) {
				this.logresWebService.userSearchData = response['data'];
			}
		}, (errResponse) => {
			console.log("search() :: Error response: ", errResponse);
			this.pnotify.closeAll();
			this.pnotify.alert({
				text: 'Something went wrong. Please try again later',
				type: 'error'
			});
			this.queryVal = "";
		});
	}
}
