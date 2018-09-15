import { Component } from '@angular/core';
import { PNotifyService } from './services/pnotify.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { LogresWebService } from './services/logresweb.service';

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	public pnotify: any;

	public appVisitFirst: boolean;

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
			if (errResponse.error['success'] === false) {
				this.pnotify.alert({
					text: errResponse.error['error'],
					type: 'error'
				});
				return;
			}
		});
	}

}
