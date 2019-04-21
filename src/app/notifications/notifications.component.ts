import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from 'primeng/primeng';
import { NotificationsService } from './notifications.service';
import { Subscription } from 'rxjs/Subscription';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'
  ]
})
export class NotificationsComponent implements OnInit, OnDestroy {
  msgs: Message[] = [];
  subscription: Subscription;

  constructor(private notificationsService: NotificationsService,
      private messageService: MessageService) { }

  ngOnInit() {
    this.subscribeToNotifications();
  }

  subscribeToNotifications() {
    this.subscription = this.notificationsService.notificationChange
    .subscribe(notification => {
      //this.msgs.length = 0;
      //this.msgs.push(notification);
      //console.log('notification',notification);
      this.messageService.add({
          severity:notification['severity'], 
          summary:notification['summary'], 
          detail:notification['detail'],
          // sticky:true,
          // life:10000
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.messageService.clear();
  }
}