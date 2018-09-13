import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LogresWebService {

	private baseURL: string = 'http://localhost:8000/api/v1/user/';

	constructor(public httpClient: HttpClient) { }

	public register(userData: any) {
		return this.httpClient.post(this.baseURL + 'register', userData);
	}

	public login(loginData: any) {
		return this.httpClient.post(this.baseURL + 'login', loginData);
	}

}
