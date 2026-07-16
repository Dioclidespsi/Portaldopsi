import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { BillingModule } from './billing/billing.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ProfileModule } from './profile/profile.module';
import { PsychTestsModule } from './psych-tests/psych-tests.module';
import { CoursesModule } from './courses/courses.module';
import { CertificatesModule } from './certificates/certificates.module';
import { LibraryModule } from './library/library.module';
import { SupervisionModule } from './supervision/supervision.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { CrmModule } from './crm/crm.module';
import { CommunityModule } from './community/community.module';
import { AiModule } from './ai/ai.module';
import { TeleconsultaModule } from './teleconsulta/teleconsulta.module';
import { PatientPortalModule } from './patient-portal/patient-portal.module';
import { AsaasModule } from './asaas/asaas.module';
import { AdminModule } from './admin/admin.module';
import { DocumentTemplatesModule } from './document-templates/document-templates.module';
import { AvailabilityModule } from './availability/availability.module';
import { BookingModule } from './booking/booking.module';
import { BannersModule } from './banners/banners.module';
import { DirectoryModule } from './directory/directory.module';
import { EstudanteAccessGuard } from './common/estudante-access.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    PatientsModule,
    BillingModule,
    AppointmentsModule,
    InvoicesModule,
    ProfileModule,
    PsychTestsModule,
    CoursesModule,
    CertificatesModule,
    LibraryModule,
    SupervisionModule,
    MarketplaceModule,
    CrmModule,
    CommunityModule,
    AiModule,
    TeleconsultaModule,
    PatientPortalModule,
    AsaasModule,
    AdminModule,
    DocumentTemplatesModule,
    AvailabilityModule,
    BookingModule,
    BannersModule,
    DirectoryModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: EstudanteAccessGuard }],
})
export class AppModule {}
