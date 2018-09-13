import { Component } from '@angular/core';
import  { PNotifyService } from './services/pnotify.service';

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	public pnotify: any;

	constructor(public pnotifyService: PNotifyService) {
		this.pnotify = this.pnotifyService.getPNotify();
		this.pnotify.alert({
			title: 'Welcome to logres!',
			type: 'info',
			icon: false
		});
	}

}
