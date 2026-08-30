'use client';

import { useEffect, useState } from 'react';
import { Appointment, createTeleconsultaRoom, getTeleconsultaJoinLink } from '../../lib/api';

/**
 * Embute a sala do Daily.co via iframe — a UI de chamada (câmera/mic/tela de
 * pré-entrada/sair) já vem pronta do lado do Daily (enable_prejoin_ui: true no
 * backend), não precisamos de nenhum SDK novo nem controles customizados.
 *
 * A sala é criada uma única vez por agendamento (o nome é fixo em
 * `portal-do-psi-{appointmentId}` — criar de novo dá erro no Daily). Se o
 * agendamento já tem `videoRoomUrl` (criada automaticamente ao agendar, ou em
 * visita anterior a esta tela), pula direto pra mintar o link de entrada.
 */
export default function TeleconsultaRoom({ appointment, small = false }: { appointment: Appointment; small?: boolean }) {
  const [joinUrl, setJoinUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setJoinUrl(null);
    setError(null);
    setLoading(true);

    (async () => {
      try {
        if (!appointment.videoRoomUrl) {
          await createTeleconsultaRoom(appointment.id);
        }
        const { url } = await getTeleconsultaJoinLink(appointment.id);
        // A UI da sala em si (botões "Join"/"Leave", tela de pré-entrada) é do
        // Daily.co — localizamos via parâmetro de URL deles, não dá pra
        // traduzir por fora (é dentro do iframe deles).
        const localizedUrl = `${url}&lang=pt-BR`;
        if (!cancelled) setJoinUrl(localizedUrl);
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment.id, appointment.videoRoomUrl]);

  if (loading) {
    return (
      <div className="consultorio-video-placeholder">
        <p className="sub">Conectando à sala…</p>
      </div>
    );
  }

  if (error || !joinUrl) {
    return (
      <div className="consultorio-video-placeholder">
        <span className="error">{error ?? 'Não foi possível carregar a sala.'}</span>
      </div>
    );
  }

  return (
    <iframe
      key={appointment.id}
      src={joinUrl}
      allow="camera; microphone; fullscreen; display-capture; autoplay"
      style={{ width: '100%', height: '100%', border: 0, borderRadius: '10px', minHeight: small ? '220px' : '360px' }}
      title="Videochamada"
    />
  );
}
