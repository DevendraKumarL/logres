import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { UserService } from '../services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor(private userService: UserService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
		if (this.userService.isLoggedIn()) {
			let token = this.userService.getToken();
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`
				}
			});
			return next.handle(request);
		}
		return next.handle(request);
	}

}