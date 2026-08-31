export const metadata = {
  title: 'Exclusão de Conta e Dados — Portal do Psi',
};

export default function AccountDeletionPage() {
  return (
    <div className="shell shell-wide">
      <h1>Exclusão de Conta e Dados</h1>
      <p className="sub">Última atualização: 31 de agosto de 2026</p>

      <p>
        Esta página explica como solicitar a exclusão da sua conta e dos seus dados pessoais no Portal do Psi,
        seja você psicólogo/clínica ou paciente. Veja também a nossa{' '}
        <a href="/privacidade">Política de Privacidade</a> para mais detalhes sobre tratamento de dados.
      </p>

      <h2>1. Como solicitar</h2>
      <p>
        Envie um e-mail para <strong>portaldopsiapp@gmail.com</strong> com o assunto "Exclusão de conta",
        informando:
      </p>
      <ul>
        <li>Se você é psicólogo/clínica ou paciente;</li>
        <li>O e-mail cadastrado na plataforma;</li>
        <li>Se for paciente, o nome da clínica/psicólogo pelo qual você é atendido (ajuda a localizar sua conta).</li>
      </ul>
      <p>Respondemos e concluímos o pedido em até 15 dias úteis.</p>

      <h2>2. O que é excluído</h2>
      <ul>
        <li>Login e senha de acesso à plataforma;</li>
        <li>Dados de perfil (nome, e-mail, telefone, foto);</li>
        <li>Preferências, notificações push cadastradas e sessões ativas.</li>
      </ul>

      <h2>3. O que é mantido, e por quê</h2>
      <p>
        Alguns dados não podem ser excluídos imediatamente por exigirem retenção legal, mesmo após o pedido de
        exclusão de conta:
      </p>
      <ul>
        <li>
          <strong>Prontuário e registros clínicos:</strong> mantidos pelo psicólogo responsável pelo prazo exigido
          pela Resolução CFP nº 06/2019 — a exclusão da sua conta de acesso não apaga o prontuário, que é
          obrigação legal do profissional preservar.
        </li>
        <li>
          <strong>Registros financeiros:</strong> comprovantes de pagamento e notas fiscais são mantidos pelo
          prazo exigido pela legislação fiscal brasileira.
        </li>
      </ul>
      <p>
        Fora esses casos, seus dados pessoais são removidos ou anonimizados nos sistemas da plataforma.
      </p>

      <h2>4. Contas de paciente vinculadas a mais de uma clínica</h2>
      <p>
        Seu login de paciente é único e pode estar vinculado a mais de um profissional. Ao pedir a exclusão,
        removemos o acesso e os dados de perfil em todas as clínicas vinculadas — cada uma mantém apenas o
        prontuário que já tinha, pelas mesmas razões legais do item 3.
      </p>
    </div>
  );
}
