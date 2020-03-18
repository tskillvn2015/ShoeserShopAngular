import { Injectable,ErrorHandler } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler{

  constructor(private _notificationService :NotificationService) { }
  handleError(error: any): void {
    const message = error.message ? error.message : error.toString();
    this._notificationService.printErrorMessage(message);
    throw error;
  }

}
