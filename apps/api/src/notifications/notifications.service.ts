import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FirebaseAdminService, PushPayload } from './firebase-admin.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebase: FirebaseAdminService,
  ) {}

  registerToken(tenantId: string, patientId: string, fcmToken: string) {
    const tenantPrisma = this.prisma.forTenant(tenantId);
    return tenantPrisma.pushSubscription.upsert({
      where: { fcmToken },
      create: { tenantId, patientId, fcmToken },
      update: { tenantId, patientId },
    });
  }

  async unregisterToken(tenantId: string, fcmToken: string) {
    await this.prisma.forTenant(tenantId).pushSubscription.deleteMany({ where: { fcmToken } });
    return { removed: true };
  }

  /** Manda push pra todos os dispositivos do paciente — poda do banco qualquer token que o FCM reportar como morto. */
  async notifyPatient(tenantId: string, patientId: string, payload: PushPayload) {
    if (!this.firebase.enabled) return;
    const tenantPrisma = this.prisma.forTenant(tenantId);
    const subscriptions = await tenantPrisma.pushSubscription.findMany({ where: { patientId }, select: { fcmToken: true } });
    if (subscriptions.length === 0) return;

    const { invalidTokens } = await this.firebase.sendToTokens(
      subscriptions.map((s) => s.fcmToken),
      payload,
    );
    if (invalidTokens.length > 0) {
      await tenantPrisma.pushSubscription.deleteMany({ where: { fcmToken: { in: invalidTokens } } });
    }
  }
}
