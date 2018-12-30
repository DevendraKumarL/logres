import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor(private userService: UserService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
		if (this.userService.isLoggedIn()) {
			console.log("intercept() User is Logged In");
			let token = this.userService.getToken();
			const cloneRequest = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`
				}
			});
			return next.handle(cloneRequest);
		}
		return next.handle(request);
	}

}