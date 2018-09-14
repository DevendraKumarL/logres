import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PNotifyService } from './pnotify.service';

@Injectable()
export class LogresWebService {

	private baseURL: string = 'http://localhost:8000/api/v1/user/';
	private pnotify: any;
	public sendingReq: boolean = false;

	constructor(
		public httpClient: HttpClient,
		public pnotifyService: PNotifyService) {

		this.pnotify = this.pnotifyService.getPNotify();
	}

	public register(userData: any) {
		this.showLoading();
		return this.httpClient.post(this.baseURL + 'register', userData);
	}

	public login(loginData: any) {
		return this.httpClient.post(this.baseURL + 'login', loginData);
	}

	public resetRequest(email: string) {
		this.showLoading();
		return this.httpClient.get(this.baseURL + 'password/reset/request?email=' + email);
	}

	public resetPassword(resetData: any) {
		this.showLoading();
		return this.httpClient.post(this.baseURL + 'password/reset', resetData);
	}

	private showLoading() {
		this.pnotify.alert({
			text: 'Please wait...',
			type: 'info',
			icon: 'fa fa-spinner fa-spin'
		});
	}

}
