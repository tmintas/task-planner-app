export enum NotificationType {
    Info = 1,
    Error = 2,
}

export class Notification {
    public Title: string;
    public Content: string;
    public Type: NotificationType;
    public Collapsed : boolean = true;

    constructor(title: string, type: NotificationType | null, content : string) {
        this.Title = title;
        this.Type = type;
        this.Content = content;
    }
}