/**
 * Selos de forma de pagamento aceita — mostra as bandeiras/meios de
 * pagamento reais (Pix, Visa, Mastercard, Elo), nunca o nome do gateway
 * (Asaas) por trás, que não significa nada pro paciente/aluno/psicólogo.
 */
export default function PaymentBadges() {
  const chip: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    height: '26px', padding: '0 0.6rem', borderRadius: '5px',
    fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.01em',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
      <span style={{ ...chip, background: '#32BCAD', color: '#fff' }}>Pix</span>
      <span style={{ ...chip, background: '#fff', color: '#1A1F71', fontStyle: 'italic', border: '1px solid #e0e0e0' }}>VISA</span>
      <span style={{ ...chip, background: '#fff', border: '1px solid #e0e0e0', gap: '2px' }}>
        <span style={{ width: '13px', height: '13px', borderRadius: '50%', background: '#EB001B', marginRight: '-5px' }} />
        <span style={{ width: '13px', height: '13px', borderRadius: '50%', background: '#F79E1B', opacity: 0.85 }} />
      </span>
      <span style={{ ...chip, background: '#000', color: '#fff' }}>elo</span>
    </div>
  );
}
