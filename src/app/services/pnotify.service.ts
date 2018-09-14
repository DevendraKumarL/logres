import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';

@Injectable()
export class PNotifyService {

	constructor() { }

	getPNotify() {
		PNotifyButtons;
		let pnotify = PNotify;
		pnotify.defaults.width = '400px';
		return pnotify;
	}

}
