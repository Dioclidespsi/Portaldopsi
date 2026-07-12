import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portal do Psi',
  description: 'Plataforma para administrar a clínica, estudar, receber supervisão e acompanhar pacientes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
