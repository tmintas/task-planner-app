import { Notifier } from '../utils/notifier';

import { Notification, NotificationType } from '../models/notification.model';

export class NotificationService {
    private notifier : Notifier;

    public get Notifications() : Notification[]  {
        return this.notifier.Notifications;
    }

    constructor() {
        this.notifier = new Notifier();
    }

    public AddInfo(message : string, description : string) : void {
        this.notifier.Notifications.push(new Notification(message, NotificationType.Info, description));
    }

    public AddError(message : string, description : string) : void {
        this.notifier.Notifications.push(new Notification(message, NotificationType.Error, description));
    }

    public RemoveNotification(notification : Notification) {
        this.notifier.Notifications.splice(this.notifier.Notifications.indexOf(notification), 1);
    }

    public RemoveAllNotifications() : void {
        this.notifier.Notifications = [];
    }

}