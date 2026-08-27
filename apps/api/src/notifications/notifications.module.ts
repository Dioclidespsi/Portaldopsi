import { Module } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';
import { NotificationsService } from './notifications.service';
import { AppointmentReminderCron } from './appointment-reminder.cron';
import { ComplimentarySubscriptionExpiryCron } from './complimentary-subscription-expiry.cron';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [EmailModule],
  providers: [FirebaseAdminService, NotificationsService, AppointmentReminderCron, ComplimentarySubscriptionExpiryCron],
  exports: [NotificationsService],
})
export class NotificationsModule {}
