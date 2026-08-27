export const metadata = {
  title: 'Termo de Uso do Paciente — Portal do Psi',
};

export default function TermosPacientePage() {
  return (
    <div className="shell shell-wide">
      <h1>Termo de Uso — Paciente</h1>
      <p className="sub">Última atualização: 28 de julho de 2026</p>

      <h2>1. O que é o Portal do Psi</h2>
      <p>
        O Portal do Psi é uma plataforma que conecta você a psicólogos(as) independentes, permitindo buscar
        profissionais, agendar sessões, pagar por elas e acompanhar seus atendimentos (histórico de sessões,
        documentos, testes, tarefas) em um único login, válido para qualquer profissional que atenda você através da
        plataforma.
      </p>
      <p>
        <strong>O Portal do Psi não presta atendimento psicológico.</strong> Cada profissional listado é
        independente, responsável pela própria conduta clínica, inscrito em seu Conselho Regional de Psicologia. A
        relação terapêutica é estabelecida entre você e o profissional, não com a plataforma.
      </p>

      <h2>2. Cadastro e conta</h2>
      <p>
        Seu login (e-mail e senha) é único e vale para agendar com qualquer profissional na plataforma — você não
        precisa criar uma conta nova pra cada psicólogo(a) diferente.
      </p>
      <p>Você é responsável por manter sua senha em sigilo e por manter seus dados de contato atualizados.</p>

      <h2>3. Agendamento e pagamento</h2>
      <p>
        Ao escolher um horário, ele fica reservado por tempo limitado enquanto você finaliza o pagamento; se o
        pagamento não for confirmado dentro desse prazo, o horário volta a ficar disponível para outra pessoa.
      </p>
      <p>
        O pagamento é processado por gateway de pagamento nacional (Pix, cartão ou boleto, conforme
        disponibilidade). O valor da sessão é definido por cada profissional e exibido antes da confirmação.
      </p>
      <p>
        Cancelamento e reembolso seguem a política informada por cada profissional na página de agendamento; na
        ausência de política específica, aplica-se o direito de arrependimento previsto no Código de Defesa do
        Consumidor para compras feitas fora do estabelecimento comercial (Art. 49), quando aplicável.
      </p>

      <h2>4. Teleconsulta</h2>
      <p>
        Sessões online usam videochamada seguindo o método pretendido pelo profissional. Você é avisado sempre que
        sua confirmação/consentimento for necessário antes de uma sessão online.
      </p>
      <p>
        <strong>Nenhuma sessão é gravada automaticamente pela plataforma.</strong> Se o profissional desejar gravar
        uma sessão, isso exige consentimento explícito seu, fora deste termo geral.
      </p>

      <h2>5. Seus dados e sigilo</h2>
      <p>
        Seus dados de saúde (respostas de testes, conteúdo de documentos, histórico de sessões) são tratados como
        dado sensível conforme a LGPD, acessíveis apenas ao(à) profissional que te atende em cada clínica — nunca
        compartilhados entre profissionais diferentes sem seu conhecimento.
      </p>
      <p>
        Você pode solicitar a exclusão de sua conta e dados a qualquer momento, respeitado o prazo de guarda de
        prontuário exigido por lei, que é de responsabilidade do profissional que te atendeu.
      </p>

      <h2>6. Documentos e testes</h2>
      <p>
        Documentos disponibilizados por seu profissional (laudos, atestados, relatórios) são gerados e de
        responsabilidade exclusiva dele(a).
      </p>
      <p>
        Resultados de testes psicológicos aplicados pela plataforma são sempre revisados e interpretados pelo
        profissional — a plataforma não gera diagnóstico nem interpretação automática.
      </p>

      <h2>7. Limitação de responsabilidade</h2>
      <p>
        A plataforma não se responsabiliza pela qualidade, conduta ou resultado do atendimento prestado pelo
        profissional escolhido, nem por indisponibilidade de serviços de terceiros (pagamento, videochamada).
      </p>

      <h2>8. Foro</h2>
      <p>Fica eleito o foro do seu domicílio para dirimir controvérsias, conforme proteção ao consumidor.</p>
    </div>
  );
}
