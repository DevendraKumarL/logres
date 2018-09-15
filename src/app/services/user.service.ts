import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Token } from '@angular/compiler';

const TOKEN: string = 'TOKEN';
const APP_VISIT_FIRST: string = 'APP_VISIT_FIRST';
const PROFILE_NAME = 'PROFILE_NAME';

@Injectable()
export class UserService {

	public userLoggedIn: boolean;
	public profileName: string;

	constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
		this.sessionUpdate();
		this.profileName = this.getProfileName();
	}

	public sessionUpdate() {
		this.userLoggedIn = this.isLoggedIn();
		console.log('userLoggedIn: ', this.userLoggedIn);
	}


	public saveToken(token: string): void {
		this.storage.set(TOKEN, token);
		this.sessionUpdate();
	}

	public getToken(): string {
		return this.storage.get(TOKEN);
	}


	public isLoggedIn(): boolean {
		return this.storage.get(TOKEN) !== null;
	}

	public logout() {
		this.storage.remove(TOKEN);
		this.storage.remove(PROFILE_NAME);
		this.sessionUpdate();
	}


	public saveProfileName(name: string) {
		this.storage.set(PROFILE_NAME, name);
		this.profileName = name;
	}

	public getProfileName(): string {
		return this.storage.get(PROFILE_NAME);
	}


	public firstAppVisit(): boolean {
		let check = this.storage.get(APP_VISIT_FIRST);
		if (check === null) {
			this.storage.set(APP_VISIT_FIRST, true);
			return true;
		}
		return false;
	}

}
