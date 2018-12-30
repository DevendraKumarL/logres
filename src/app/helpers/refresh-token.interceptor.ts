import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../services/user.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

    constructor(private userService: UserService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        return next.handle(request).catch((errorResponse: HttpErrorResponse) => {
            if (errorResponse.status === 401 && errorResponse.error.error === 'Token has expired') {
                console.log("RefreshTokenInterceptor 401 error: ", errorResponse);
                const token = errorResponse.error.token;
                console.log("new token", token);
                this.userService.saveToken(token);
                const cloneRequest = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return next.handle(cloneRequest);
            }
            return Observable.throw(errorResponse);
        });
    }
}