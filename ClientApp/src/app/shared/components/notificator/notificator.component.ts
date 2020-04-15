import { Component } from '@angular/core';
import { NotificationService } from 'app/shared/services/notification.service';
import { Notification } from 'app/shared/models/notification.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-notificator',
    templateUrl: './notificator.component.html',
    styleUrls: ['./notificator.component.scss'],
    animations: [
        trigger(
            'inOutAnimation', [
                transition(
                ':enter', [
                    style({ opacity: 0 }),
                    animate('0.1s ease-out', style({ opacity: 1 })) ]
                ),
                transition(
                ':leave', [
                    style({ opacity: 1 }),
                    animate('0.1s ease-in', style({ opacity: 0 })) ]
                )
            ]  
        )
    ]
})
export class NotificatorComponent {

    public get Notifications() : Notification[] {
        return this.ns.Notifications;
    }

    constructor(private ns: NotificationService) { }

    public OnNotificationClick(ntf : Notification) : void {
        this.ns.RemoveNotification(ntf);
    }
}
