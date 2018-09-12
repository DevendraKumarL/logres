import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var grecaptcha: any;

@Component({
	selector: 'signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent {

	public signUpForm: FormGroup;

	public formError: boolean;
	public formErrMsg: string;

	constructor(public formBuilder: FormBuilder) {
		this.signUpForm = formBuilder.group({
			name: ["", Validators.compose([Validators.required])],
			email: ["", Validators.compose([Validators.required, Validators.email])],
			password: ["", Validators.compose([Validators.required])],
			password2: ["", Validators.compose([Validators.required])]
		});

		this.signUpForm.controls['password'].valueChanges.subscribe((value) => {
			this.formError = false;
			this.formErrMsg = "";
		});
		this.signUpForm.controls['password2'].valueChanges.subscribe((value) => {
			this.formError = false;
			this.formErrMsg = "";
		});
	}

	signUp() {
		if (this.signUpForm.controls.password.value !== this.signUpForm.controls.password2.value)
		{
			this.formError = true;
			this.formErrMsg = "Passwords do not match";
			return;
		}
		
	}

	clearSignUpForm() {
		this.signUpForm.reset();
		this.formError = false;
		this.formErrMsg = "";

		grecaptcha.reset();
	}

}
