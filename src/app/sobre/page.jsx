import Link from "next/link";

export const metadata = {
  title: "Sobre o Plano Bíblico",
  description: "A história por trás do Plano Bíblico — criado por Paulo Henrique Dias, engenheiro de dados apaixonado por computação e teologia.",
  alternates: { canonical: "https://planobiblia.com.br/sobre" },
  openGraph: {
    title: "Sobre o Plano Bíblico",
    description: "Criado por um engenheiro de dados apaixonado por teologia. A ferramenta que eu precisava e não existia.",
    url: "https://planobiblia.com.br/sobre",
    type: "website",
  },
};

export default function SobrePage() {
  return (
    <div className="sb-page">
      <header className="sb-header">
        <Link href="/" className="sb-back">← Voltar</Link>
      </header>

      <main className="sb-main">
        <article className="sb-article">

          <p className="sb-kicker">Engenheiro de dados · Cristão</p>

          <h1 className="sb-h1">
            A ferramenta que<br />
            eu precisava<br />
            não existia.
          </h1>

          <hr className="sb-rule" />

          <div className="sb-body">

            <p>
              Me chamo <strong>Paulo Henrique Dias</strong>. Trabalho com engenharia de dados —
              pipelines, modelagem, sistemas distribuídos. Durante o dia, penso em como
              estruturar informação. À noite, leio teologia.
            </p>

            <p>
              Há alguns anos decidi percorrer a Bíblia de forma sistemática. Queria escolher
              os livros, definir o ritmo, organizar a leitura do meu jeito — não seguir o
              cronograma de outra pessoa. Procurei e não encontrei nada que me desse esse
              controle. Os planos que existiam eram prontos, fechados.
            </p>

            <p>
              Então construí para mim mesmo.
            </p>

            <hr className="sb-rule-sm" />

            <p>
              Teologia e engenharia têm mais em comum do que parecem. As duas exigem rigor,
              paciência com sistemas complexos e a humildade de perceber que você está tentando
              entender algo muito maior do que qualquer framework ou comentário bíblico vai
              conseguir capturar por completo.
            </p>

            <p>
              A Bíblia em particular é um texto extraordinariamente denso — escrita ao longo
              de milênios, em três línguas, em gêneros completamente diferentes, para contextos
              que a maioria de nós nem consegue imaginar. Ter um plano claro não é burocracia:
              é respeito pelo material.
            </p>

            <hr className="sb-rule-sm" />

            <p>
              O <strong>Plano Bíblico</strong> é gratuito. Não tem anúncios, não tem cadastro,
              não coleta dados. Nunca terá. É um projeto pessoal que decidi tornar público
              porque achei que poderia ser útil para outras pessoas — e, ao que parece, é.
            </p>

          </div>

          <blockquote className="sb-verse">
            <p>
              "Toda a Escritura é inspirada por Deus e útil para o ensino,
              para a repreensão, para a correção e para a educação na justiça."
            </p>
            <cite>2 Timóteo 3:16</cite>
          </blockquote>

          <div className="sb-footer-links">
            <Link href="/" className="sb-cta">Criar meu plano →</Link>
            <Link href="/faq" className="sb-faq-link">Perguntas frequentes</Link>
          </div>

        </article>
      </main>
    </div>
  );
}
