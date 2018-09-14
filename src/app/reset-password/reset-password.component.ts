import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PNotifyService } from '../services/pnotify.service';
import { LogresWebService } from '../services/logresweb.service';

@Component({
	selector: 'reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

	public pnotify: any;

	public resetPassForm: FormGroup;
	private resetToken: string;

	public formError: boolean;
	public formErrMsg: string;
	public tokenPresent: boolean = true;

	constructor(
		public formBuilder: FormBuilder,
		public activeRoute: ActivatedRoute,
		public pnotifyService: PNotifyService,
		public logresWebService: LogresWebService,
		public router: Router) {

		this.resetPassForm = formBuilder.group({
			password: ["", Validators.compose([Validators.required])],
			password2: ["", Validators.compose([Validators.required])],
		});

		this.resetPassForm.controls['password'].valueChanges.subscribe((value) => {
			this.formError = false;
			this.formErrMsg = "";
		});
		this.resetPassForm.controls['password2'].valueChanges.subscribe((value) => {
			this.formError = false;
			this.formErrMsg = "";
		});

		this.pnotify = this.pnotifyService.getPNotify();

		this.activeRoute.queryParams.subscribe((params) => {
			this.resetToken = params['resetToken'];
			console.log('resetToken: ', this.resetToken);
			if (this.resetToken === undefined || this.resetToken === "") {
				this.pnotify.alert({
					title: 'Password reset token is missing',
					type: 'error',
				});
				return;
			}
		});
	}

	resetPassword() {
		if (this.resetPassForm.controls.password.value !== this.resetPassForm.controls.password2.value) {
			this.formError = true;
			this.formErrMsg = "Passwords do not match";
			return;
		}

		let resetData = {
			reset_code: this.resetToken,
			password: this.resetPassForm.controls.password.value
		};

		this.logresWebService.sendingReq = true;
		this.logresWebService.resetPassword(resetData).subscribe((response) => {
			console.log("resetPassword() :: Success response: ", response);
			this.logresWebService.sendingReq = false;
			this.pnotify.closeAll();
			if (response['success'] === true) {
				this.pnotify.alert({
					title: 'Success',
					text: response['message'],
					type: 'success'
				});
				this.router.navigate(['login']);
				return;
			}
		}, (errResponse) => {
			console.log("resetPassword() :: Error response: ", errResponse);
			if (errResponse.error['success'] === false) {
				this.pnotify.closeAll();
				this.formError = true;
				this.formErrMsg = errResponse.error['error'];
				this.logresWebService.sendingReq = false;
				return;
			}

		});
	}

	clearResetForm() {
		this.resetPassForm.reset();
		this.formError = false;
		this.formErrMsg = "";
	}
}
