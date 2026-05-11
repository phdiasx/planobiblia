import Link from "next/link";

export const metadata = {
  title: "Sobre o Plano Bíblico",
  description: "A história por trás do Plano Bíblico — criado por Paulo Henrique Dias.",
  alternates: { canonical: "https://planobiblia.com.br/sobre" },
  openGraph: {
    title: "Sobre o Plano Bíblico",
    description: "A ferramenta que eu precisava e não existia.",
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
              Me chamo <strong>Paulo Henrique Dias</strong>. Sou cristão e trabalho com tecnologia.
            </p>

            <p>
              Quis percorrer a Bíblia de forma sistemática, escolhendo os livros e definindo o ritmo.
              Não encontrei nada que me desse esse controle. Os planos eram prontos, fechados.
            </p>

            <p>
              Então construí.
            </p>

            <hr className="sb-rule-sm" />

            <p>
              O <strong>Plano Bíblico</strong> é gratuito. Não tem cadastro,
              não coleta dados. É um projeto pessoal que decidi tornar público
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
