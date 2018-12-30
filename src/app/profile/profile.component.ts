import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PNotifyService } from '../services/pnotify.service';
import { Router } from '@angular/router';
import { LogresWebService } from '../services/logresweb.service';
import { UserService } from '../services/user.service';

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

	public pnotify: any;
	public profileInfo: any;

	public profileErr: boolean;
	public errMsg: string;

	constructor(
		public pnotifyService: PNotifyService,
		public logresWebSerivce: LogresWebService,
		public userService: UserService,
		public router: Router) {

		this.pnotify = this.pnotifyService.getPNotify();
		this.getProfileInfo();
	}

	getProfileInfo() {
		this.logresWebSerivce.profile().subscribe((response) => {
			console.log("getProfileInfo() :: Success response: ", response);
			this.logresWebSerivce.sendingReq = false;
			this.pnotify.closeAll();
			if (response['success'] === true) {
				this.profileInfo = response['user'];
				this.userService.saveProfileName(this.profileInfo.name);
				return;
			}
		}, (errResponse) => {
			console.log("getProfileInfo() :: Error response: ", errResponse);
			this.logresWebSerivce.sendingReq = false;
			this.pnotify.closeAll();
			// FIXME: error response handling
			if (errResponse.error['success'] === false) {
				this.profileErr = true;
				this.errMsg = errResponse.error['error'];
				return;
			}
		});
	}

}
