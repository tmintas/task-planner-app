export enum NotificationType {
    Info = 1,
    Error = 2,
}

export class Notification {

    public Message: string;
    public Description: string;
    public Type: NotificationType;

    constructor(message: string, type: NotificationType | null, description : string) {
        this.Message = message;
        this.Type = type;
        this.Description = description;
    }
}