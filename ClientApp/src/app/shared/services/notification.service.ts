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

    public AddInfo(title : string, description : string) : void {
        this.notifier.Notifications.push(new Notification(title, NotificationType.Info, description));
    }

    public AddError(title : string, content? : string) : void {
        this.notifier.Notifications.push(new Notification(title, NotificationType.Error, content));
    }

    public RemoveNotification(notification : Notification) {
        this.notifier.Notifications.splice(this.notifier.Notifications.indexOf(notification), 1);
    }

    public RemoveAllNotifications() : void {
        this.notifier.Notifications = [];
    }

}