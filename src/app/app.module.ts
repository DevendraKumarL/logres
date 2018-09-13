import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { routes } from './routes';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LogresWebService } from './services/logresweb.service';
import { PNotifyService } from './services/pnotify.service';


@NgModule({
	declarations: [
		AppComponent,
		SignupComponent,
		LoginComponent,
		ProfileComponent,
		ResetPasswordComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule.forRoot(routes)
	],
	providers: [LogresWebService, PNotifyService],
	bootstrap: [AppComponent]
})
export class AppModule { }
