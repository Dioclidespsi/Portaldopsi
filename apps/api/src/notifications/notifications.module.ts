import { Module } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';
import { NotificationsService } from './notifications.service';
import { AppointmentReminderCron } from './appointment-reminder.cron';

@Module({
  providers: [FirebaseAdminService, NotificationsService, AppointmentReminderCron],
  exports: [NotificationsService],
})
export class NotificationsModule {}
