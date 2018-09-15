import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { routes } from './routes';

import { HttpClientModule } from '@angular/common/http';

import { StorageServiceModule } from 'angular-webstorage-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LogresWebService } from './services/logresweb.service';
import { PNotifyService } from './services/pnotify.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { TokenInterceptor } from './helpers/token.interceptor';


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
		StorageServiceModule,
		RouterModule.forRoot(routes)
	],
	providers: [
		LogresWebService,
		PNotifyService,
		UserService,
		AuthGuard,
		NotLoggedInGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
