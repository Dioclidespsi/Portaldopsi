'use client';

import { InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/** Campo de senha com o "olho" pra ver o que foi digitado — o "lembrar" de verdade
 * é o autoComplete correto (username/current-password) puxando o gerenciador de
 * senha do próprio navegador, nunca guardado à mão pelo app. */
export default function PasswordInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      <input {...props} type={visible ? 'text' : 'password'} style={{ ...props.style, paddingRight: '2.4rem', width: '100%' }} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
        style={{
          position: 'absolute', right: '0.4rem', top: '50%', transform: 'translateY(-50%)',
          background: 'transparent', border: 'none', padding: '0.2rem', color: 'var(--ink-soft)',
          display: 'flex', alignItems: 'center',
        }}
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}
