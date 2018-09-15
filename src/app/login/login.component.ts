import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogresWebService } from '../services/logresweb.service';
import { PNotifyService } from '../services/pnotify.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {

	public pnotify: any;

	public loginForm: FormGroup;
	public resetReqForm: FormGroup;

	public formError: boolean;
	public formErrMsg: string;

	public loginFormActive: boolean;

	constructor(
		public formBuilder: FormBuilder,
		public logresWebService: LogresWebService,
		public pnotifyService: PNotifyService,
		public userService: UserService,
		public router: Router) {

		this.loginFormActive = true;
		this.loginForm = formBuilder.group({
			email: ["", Validators.compose([Validators.required, Validators.email])],
			password: ["", Validators.compose([Validators.required])]
		});

		this.resetReqForm = formBuilder.group({
			resetEmail: ["", Validators.compose([Validators.required, Validators.email])]
		});

		this.pnotify = this.pnotifyService.getPNotify();
	}

	login() {
		let loginData = {
			email: this.loginForm.controls.email.value,
			password: this.loginForm.controls.password.value
		};
		this.logresWebService.login(loginData).subscribe((response) => {
			console.log("login() :: Success response: ", response);
			this.logresWebService.sendingReq = false;
			this.pnotify.closeAll();
			if (response['success'] === true) {
				this.userService.saveToken(response['token']);
				this.pnotify.alert({
					title: 'Login Successful',
					type: 'success'
				});
				this.router.navigate(['profile']);
				return;
			}
		}, (errResponse) => {
			console.log("login() :: Error response: ", errResponse);
			this.logresWebService.sendingReq = false;
			this.pnotify.closeAll();
			if (errResponse.error['success'] === false) {
				this.formError = true;
				this.formErrMsg = typeof errResponse.error['error'] === 'object' ?
					errResponse.error.error['email'] : errResponse.error['error'];
				return;
			}
		});
	}

	resetRequest() {
		this.logresWebService.resetRequest(this.resetReqForm.controls.resetEmail.value).subscribe((response) => {
			console.log("resetRequest() :: Success response: ", response);
			this.logresWebService.sendingReq = false;
			this.pnotify.closeAll();
			if (response['success'] === true) {
				this.pnotify.alert({
					type: 'success',
					title: 'Success',
					text: response['message']
				});
				this.clearForms();
			} else {
				this.pnotify.alert({
					text: response['error'],
					type: 'notice'
				});
			}

		}, (errResponse) => {
			console.log("resetRequest() :: Error response: ", errResponse);
			this.logresWebService.sendingReq = false;
			this.pnotify.closeAll();
			if (errResponse.error['success'] === false) {
				this.formError = true;
				this.formErrMsg = errResponse.error['error'];
				return;
			}
		});
	}

	clearForms() {
		this.loginForm.reset();
		this.resetReqForm.reset();
		this.formError = false;
		this.formErrMsg = "";
	}

	switchForm($event, bool) {
		this.loginFormActive = (bool === "false") ? true : false;
		console.log(bool + " :: " + this.loginFormActive + " :: " + (bool === "false"));
		this.clearForms();
	}
}
