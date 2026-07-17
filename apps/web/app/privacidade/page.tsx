export const metadata = {
  title: 'Política de Privacidade — Portal do Psi',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="shell shell-wide">
      <h1>Política de Privacidade</h1>
      <p className="sub">Última atualização: 17 de julho de 2026</p>

      <p>
        O Portal do Psi é uma plataforma que conecta psicólogos e pacientes, oferecendo agendamento de consultas,
        prontuário eletrônico, aplicação de testes psicológicos, dever de casa, trilhas de meditação e cursos. Esta
        política explica quais dados coletamos, por que coletamos, e quais são os seus direitos — em conformidade com
        a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).
      </p>

      <h2>1. Quem somos</h2>
      <p>
        O Portal do Psi é operado como plataforma multi-clínica: cada psicólogo ou clínica cadastrada é o
        responsável (controlador de dados) pelas informações dos próprios pacientes. A plataforma atua como
        operadora de dados, fornecendo a infraestrutura técnica.
      </p>

      <h2>2. Quais dados coletamos</h2>
      <ul>
        <li><strong>Dados de cadastro:</strong> nome, e-mail, telefone, CPF/CNPJ (quando necessário para cobrança).</li>
        <li>
          <strong>Dados clínicos:</strong> anotações de prontuário, respostas e resultados de testes psicológicos,
          dever de casa e comunicações registradas pelo psicólogo — sempre visíveis apenas ao psicólogo responsável
          e ao próprio paciente, nunca a outros pacientes ou outras clínicas.
        </li>
        <li><strong>Dados de agendamento:</strong> horários de consulta, status de pagamento, histórico de sessões.</li>
        <li><strong>Dados de uso:</strong> progresso em cursos, trilhas de meditação ouvidas, respostas de testes.</li>
        <li>
          <strong>Notificações push:</strong> se você ativar notificações, armazenamos um identificador técnico do
          seu dispositivo (token) só para enviar lembretes de consulta e avisos — nunca conteúdo clínico.
        </li>
      </ul>

      <h2>3. Isolamento entre clínicas</h2>
      <p>
        A plataforma foi construída com isolamento técnico obrigatório entre clínicas (row-level security no banco
        de dados): os dados de pacientes de uma clínica nunca são acessíveis por outra clínica, nem pela equipe da
        plataforma em uso normal — exceto nos casos legítimos descritos abaixo.
      </p>

      <h2>4. Com quem compartilhamos dados</h2>
      <ul>
        <li><strong>Processamento de pagamentos:</strong> Asaas e/ou Stripe, só os dados necessários para cobrança.</li>
        <li><strong>Teleconsulta:</strong> Daily.co, só quando uma sala de vídeo é criada e o paciente consente.</li>
        <li><strong>Notificações push:</strong> Firebase Cloud Messaging (Google), só o token do dispositivo.</li>
        <li><strong>Assistente de IA (quando habilitado pela clínica):</strong> Anthropic, processamento das mensagens trocadas com o assistente.</li>
        <li><strong>Hospedagem e banco de dados:</strong> Vercel, Render e Neon — infraestrutura técnica, sem acesso de terceiros aos dados.</li>
      </ul>
      <p>Nunca vendemos dados de pacientes a terceiros para fins de marketing ou publicidade.</p>

      <h2>5. Seus direitos (LGPD)</h2>
      <p>Você pode, a qualquer momento, solicitar ao seu psicólogo/clínica:</p>
      <ul>
        <li>Confirmação de quais dados seus são tratados;</li>
        <li>Acesso e correção de dados incorretos ou desatualizados;</li>
        <li>Exclusão de dados (respeitando obrigações legais de retenção de prontuário, quando aplicável);</li>
        <li>Portabilidade dos dados para outro serviço;</li>
        <li>Revogação de consentimentos dados anteriormente (ex: teleconsulta, notificações push).</li>
      </ul>
      <p>
        Para exercer esses direitos, entre em contato diretamente com o psicólogo ou clínica responsável pelo seu
        atendimento — é ele quem administra seus dados na plataforma.
      </p>

      <h2>6. Retenção de dados</h2>
      <p>
        Dados de prontuário são mantidos pelo prazo exigido pela Resolução CFP nº 06/2019 e demais normas
        profissionais aplicáveis. Demais dados são mantidos enquanto a conta estiver ativa, ou pelo tempo necessário
        para cumprir obrigações legais.
      </p>

      <h2>7. Segurança</h2>
      <p>
        Utilizamos criptografia em trânsito (HTTPS) em toda a plataforma, isolamento técnico entre clínicas a nível
        de banco de dados, e senhas armazenadas com hash criptográfico (nunca em texto puro).
      </p>

      <h2>8. Contato</h2>
      <p>
        Dúvidas gerais sobre esta política podem ser enviadas para o e-mail de suporte da plataforma. Solicitações
        sobre dados pessoais específicos devem ser feitas diretamente ao seu psicólogo ou clínica.
      </p>
    </div>
  );
}
