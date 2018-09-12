import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {

	public loginForm: FormGroup;
	public resetReqForm: FormGroup;

	public formError: boolean;
	public formErrMsg: string;

	public loginFormActive: boolean;

	constructor(public formBuilder: FormBuilder) {
		this.loginFormActive = true;
		this.loginForm = formBuilder.group({
			email: ["", Validators.compose([Validators.required, Validators.email])],
			password: ["", Validators.compose([Validators.required])]
		});

		this.resetReqForm = formBuilder.group({
			resetEmail: ["", Validators.compose([Validators.required, Validators.email])]
		});
	}

	login() {

	}

	clearForms() {
		this.loginForm.reset();
		this.resetReqForm.reset();
		this.formError = false;
		this.formErrMsg = "";
	}

	showResetForm() {
		this.loginFormActive = false;
		this.clearForms();
	}

	showLoginForm() {
		this.loginFormActive = true;
		this.clearForms();
	}

}
