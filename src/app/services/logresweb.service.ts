import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PNotifyService } from './pnotify.service';

@Injectable()
export class LogresWebService {

	private baseURL: string = 'http://localhost:8000/api/v1/user/';
	private pnotify: any;
	public sendingReq: boolean = false;
	public showWelcomeMsg: boolean = true;

	constructor(
		private httpClient: HttpClient,
		private pnotifyService: PNotifyService) {

		this.pnotify = this.pnotifyService.getPNotify();
	}

	public register(userData: any) {
		this.showLoading();
		return this.httpClient.post(this.baseURL + 'register', userData);
	}

	public login(loginData: any) {
		this.showLoading();
		return this.httpClient.post(this.baseURL + 'login', loginData);
	}

	public logout() {
		this.showLoading();
		return this.httpClient.get(this.baseURL + 'logout');
	}

	public resetRequest(email: string) {
		this.showLoading();
		return this.httpClient.get(this.baseURL + 'password/reset/request?email=' + email);
	}

	public resetPassword(resetData: any) {
		this.showLoading();
		return this.httpClient.post(this.baseURL + 'password/reset', resetData);
	}

	public profile() {
		this.showLoading();
		return this.httpClient.get(this.baseURL + 'profile');
	}

	public authenticate() {
		return this.httpClient.get(this.baseURL + 'auth');
	}

	private showLoading() {
		this.sendingReq = true;
		this.pnotify.alert({
			text: 'Please wait...',
			type: 'info',
			icon: 'fa fa-spinner fa-spin'
		});
	}

}
