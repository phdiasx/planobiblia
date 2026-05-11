import Link from "next/link";

export const metadata = {
  title: "Como Ler a Bíblia em 1 Ano — Guia Completo + Plano Gratuito em PDF",
  description: "Aprenda a criar um plano de leitura bíblica para 1 ano. Quantos capítulos ler por dia, diferentes abordagens e como gerar seu plano personalizado gratuitamente em PDF.",
  alternates: { canonical: "https://planobiblia.com.br/plano-biblia-1-ano" },
  openGraph: {
    title: "Como Ler a Bíblia em 1 Ano — Guia Completo + Plano Gratuito",
    description: "Quantos capítulos ler por dia, abordagens diferentes e como gerar seu plano personalizado gratuitamente em PDF.",
    url: "https://planobiblia.com.br/plano-biblia-1-ano",
    type: "article",
  },
};

export default function PlanoBiblia1AnoPage() {
  return (
    <div className="sobre-page">
      <header className="sobre-header">
        <Link href="/" className="sobre-back">← Voltar ao app</Link>
      </header>

      <main className="sobre-main">
        <div className="sobre-card">

          <h1 className="sobre-title">Como Ler a Bíblia em 1 Ano</h1>

          <div className="sobre-body">

            <p>
              Ler a Bíblia inteira é um objetivo que muitos cristãos têm — mas poucos alcançam
              por falta de um plano claro. A boa notícia: com uma rotina simples de 3 a 4 capítulos
              por dia, qualquer pessoa consegue percorrer toda a Bíblia em 12 meses.
            </p>

            <div className="sobre-divider" />
            <h2>Quantos capítulos ler por dia?</h2>

            <p>
              A Bíblia Protestante tem <strong>66 livros</strong> e <strong>1.189 capítulos</strong>.
              A Bíblia Católica, com os livros deuterocanônicos, chega a <strong>73 livros</strong>.
            </p>
            <p>
              Para ler em exatamente 1 ano (365 dias), a conta é simples:
            </p>
            <ul>
              <li><strong>3 capítulos por dia</strong> → leitura completa em aproximadamente 13 meses</li>
              <li><strong>4 capítulos por dia</strong> → leitura completa em aproximadamente 10 meses</li>
              <li><strong>5 capítulos por dia</strong> → leitura completa em cerca de 8 meses</li>
            </ul>
            <p>
              Não existe um ritmo certo ou errado. O melhor plano é aquele que você consegue
              manter com constância. Se 4 capítulos por dia parecem muito, comece com 3 e ajuste
              conforme for sentindo.
            </p>

            <div className="sobre-divider" />
            <h2>Três formas de ler a Bíblia em 1 ano</h2>

            <h3>1. Leitura Linear (Gênesis a Apocalipse)</h3>
            <p>
              A abordagem mais tradicional: começar pelo Gênesis e ir até o Apocalipse, seguindo
              a ordem canônica. É simples, previsível e fácil de acompanhar. Ideal para quem está
              lendo a Bíblia pela primeira vez.
            </p>

            <h3>2. Leitura Cronológica</h3>
            <p>
              Os livros são lidos na ordem histórica dos eventos. Por exemplo, Jó é lido durante
              o período do Gênesis; os Salmos, junto com os eventos do reinado de Davi; as Epístolas
              de Paulo, intercaladas com Atos. Essa abordagem ajuda a entender o contexto histórico
              da narrativa bíblica.
            </p>

            <h3>3. Novo Testamento primeiro, depois Antigo Testamento</h3>
            <p>
              Indicada por muitos pastores e padres para quem quer entender a mensagem central do
              Evangelho antes de mergulhar nas narrativas do Antigo Testamento. Começar pelos quatro
              Evangelhos e as Epístolas estabelece a base teológica para compreender melhor os
              eventos do AT.
            </p>

            <div className="sobre-divider" />
            <h2>Dicas para manter a consistência</h2>

            <ul>
              <li><strong>Defina um horário fixo</strong> — manhã ao acordar ou noite antes de dormir funcionam bem para a maioria.</li>
              <li><strong>Não pule dias, mas não abandone se pulou</strong> — se perder um dia, leia normalmente no dia seguinte. Não tente compensar tudo de uma vez.</li>
              <li><strong>Imprima o plano</strong> — ter o cronograma físico na mão cria compromisso. Marcar cada dia concluído é motivador.</li>
              <li><strong>Use um plano personalizado</strong> — planos genéricos costumam não se encaixar na sua rotina. Um plano feito para o seu ritmo tem mais chance de ser cumprido.</li>
            </ul>

            <div className="sobre-divider" />
            <h2>Crie seu plano personalizado gratuitamente</h2>

            <p>
              O <strong>Plano Bíblico</strong> é uma ferramenta gratuita que permite criar um
              cronograma de leitura personalizado em minutos. Você escolhe os livros, define quantos
              capítulos quer ler por dia, a data de início — e o app gera um PDF organizadinho
              para imprimir e usar no dia a dia.
            </p>
            <p>
              Não precisa de cadastro, não coleta dados. É só você e a Palavra.
            </p>

          </div>

          <blockquote className="sobre-versiculo">
            <p>
              "Bem-aventurado o homem que não anda no conselho dos ímpios... mas o seu prazer
              está na lei do Senhor, e na sua lei medita de dia e de noite."
            </p>
            <cite>Salmos 1:1-2</cite>
          </blockquote>

          <Link href="/" className="sobre-cta">Criar meu plano agora →</Link>

          <p style={{ textAlign: "center", marginTop: "16px", fontSize: "14px", opacity: 0.6 }}>
            Veja também: <Link href="/faq" style={{ color: "var(--accent)" }}>Perguntas frequentes</Link>
          </p>

        </div>
      </main>
    </div>
  );
}
