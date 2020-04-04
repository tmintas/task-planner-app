import { Component } from '@angular/core';
import { NotificationService } from 'app/shared/services/notification.service';
import { Notification } from 'app/shared/models/notification.model';

@Component({
    selector: 'app-notificator',
    templateUrl: './notificator.component.html',
    styleUrls: ['./notificator.component.scss']
})
export class NotificatorComponent {

    public ShowDescription : boolean = false;

    constructor(private ns: NotificationService) { }

    public OnNotificationClick(ntf : Notification) : void {
        this.ns.RemoveNotification(ntf);
    }

    public ToggleDescription() : void {
        this.ShowDescription = !this.ShowDescription;
    }
}
