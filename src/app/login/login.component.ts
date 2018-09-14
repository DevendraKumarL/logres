import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogresWebService } from '../services/logresweb.service';
import { PNotifyService } from '../services/pnotify.service';

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
		public pnotifyService: PNotifyService) {

		this.loginFormActive = true;
		this.loginForm = formBuilder.group({
			email: ["", Validators.compose([Validators.required, Validators.email])],
			password: ["", Validators.compose([Validators.required])]
		});

		this.resetReqForm = formBuilder.group({
			resetEmail: ["", Validators.compose([Validators.required, Validators.email])]
		});

		this.resetReqForm.controls['resetEmail'].valueChanges.subscribe((value) => {
			this.formError = false;
			this.formErrMsg = "";
		});

		this.pnotify = this.pnotifyService.getPNotify();
	}

	login() {

	}

	resetRequest() {
		this.logresWebService.sendingReq = true;
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
			if (errResponse.error['success'] === false) {
				this.pnotify.closeAll();
				this.logresWebService.sendingReq = false;
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
