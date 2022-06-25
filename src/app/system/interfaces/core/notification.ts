export interface Notification{
    type: NotificationType;
    message: string;
}

export enum NotificationType{
    success = 'success',
    info = 'info',
    error = 'error',
}
