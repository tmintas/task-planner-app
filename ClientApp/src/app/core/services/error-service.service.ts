import { Injectable, ErrorHandler } from '@angular/core';
import { NotificationService } from 'app/shared/services/notification.service';
import { environment } from 'environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { HandledError } from 'app/shared/models/handled-error.model';

@Injectable({ providedIn: 'root' })
export class ErrorService implements ErrorHandler {
    constructor(private notificationService: NotificationService) { }

    HandleError(error: HandledError): void {
        this.handleError(error);
    }

    // ErrorHandler implementation
    handleError(error: HandledError): void {
        if (environment.production) {
            this.notificationService.AddError(
                error.ErrorTitle,
                'Please report about the error to developers');
            return;
        }

        if (error.Error instanceof HttpErrorResponse) {
            const serverError = error.Error as HttpErrorResponse;
            let content = `Error occured at <strong>${serverError.url}</strong>, status <strong>${serverError.status}</strong>`;

            if (serverError.error && serverError.error.Message) {
                content += `, custom message <strong>${serverError.error.Message}</strong>`;
            } else if (typeof serverError.error == 'string') {
                content += `, custom message <strong>${serverError.error}</strong>`;
            } else if (serverError.error instanceof ProgressEvent) {
                content += ', error while connecting to the server';
            }

            this.notificationService.AddError(error.ErrorTitle, content);
        } else {
            const clientError = error.Error as ErrorEvent;
            this.notificationService.AddError(error.ErrorTitle, 'Client Eror: ' + clientError.message);
        }
    }
}
