import { Notification } from '../models/notification.model';

export class Notifier {

    public Notifications : Notification[] = [];

    public Add(notification : Notification) {
        this.Notifications.push(notification);
    }
}