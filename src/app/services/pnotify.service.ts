import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';

@Injectable()
export class PNotifyService {

	constructor() { }

	getPNotify() {
		PNotifyButtons;
		return PNotify;
	}

}
