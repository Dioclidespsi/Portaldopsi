export interface PatientJwtPayload {
  sub: string; // patientId
  tenantId: string;
  kind: 'PACIENTE';
}
