import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogresWebService } from '../services/logresweb.service';
import { PNotifyService } from '../services/pnotify.service';
import { Router } from '@angular/router';

declare var grecaptcha: any;

@Component({
	selector: 'signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent {

	public pnotify: any;

	public signUpForm: FormGroup;

	public formError: boolean;
	public formErrMsg: string;

	constructor(
		public formBuilder: FormBuilder,
		public logresWebService: LogresWebService,
		public pnotifyService: PNotifyService,
		public router: Router) {

		this.signUpForm = formBuilder.group({
			name: ["", Validators.compose([Validators.required])],
			email: ["", Validators.compose([Validators.required, Validators.email])],
			password: ["", Validators.compose([Validators.required])],
			password2: ["", Validators.compose([Validators.required])]
		});

		this.pnotify = this.pnotifyService.getPNotify();
	}

	signUp() {
		if (this.signUpForm.controls.password.value !== this.signUpForm.controls.password2.value) {
			this.formError = true;
			this.formErrMsg = "Passwords do not match";
			return;
		}

		let userData = {
			name: this.signUpForm.controls.name.value,
			email: this.signUpForm.controls.email.value,
			password: this.signUpForm.controls.password.value
		};
		this.logresWebService.register(userData).subscribe((response) => {
			console.log("signUp() :: Success response: ", response);
			this.logresWebService.sendingReq = false;
			this.pnotify.closeAll();
			if (response['success'] === true) {
				this.pnotify.alert({
					title: 'Success',
					text: response['message'],
					type: 'success'
				});
				this.router.navigate(['login']);
			}
			else {
				this.formError = true;
				this.formErrMsg = response['message'];
			}
		}, (errResponse) => {
			console.log("signUp() :: Error response: ", errResponse);
			this.logresWebService.sendingReq = false;
			this.pnotify.closeAll();
			if (errResponse.error.error['email']) {
				this.formError = true;
				this.formErrMsg = typeof errResponse.error['error'] === 'object' ?
					errResponse.error.error['email'] : errResponse.error['error'];
				return;
			}
		});
	}

	clearSignUpForm() {
		this.signUpForm.reset();
		this.formError = false;
		this.formErrMsg = "";
		grecaptcha.reset();
	}

}
