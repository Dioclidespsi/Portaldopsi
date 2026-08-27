export interface PatientJwtPayload {
  sub: string; // patientAccountId — conta global, cross-clínica (ver PatientAccount)
  kind: 'PACIENTE';
}
