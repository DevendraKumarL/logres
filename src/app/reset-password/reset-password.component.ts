import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

	/* TODO: disable all the buttons on navigation bar */

	public resetPassForm: FormGroup;
	private resetToken: string;

	public formError: boolean;
	public formErrMsg: string;
	public tokenPresent: boolean = true;

	constructor(public formBuilder: FormBuilder, public activeRoute: ActivatedRoute) {
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

		this.activeRoute.queryParams.subscribe((params) => {
			this.resetToken = params['resetToken'];
			if (this.resetToken === undefined || this.resetToken === "") {
				this.tokenPresent = false;
				this.formErrMsg = "Invalid request. Reset token missing";
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

	}

	clearResetForm() {
		this.resetPassForm.reset();
		this.formError = false;
		this.formErrMsg = "";
	}


}
