import Link from "next/link";

export const metadata = {
  title: "Sobre — Plano Bíblico",
  description: "Conheça a história por trás do Plano Bíblico e a motivação de Paulo Henrique Dias para criá-lo.",
};

export default function SobrePage() {
  return (
    <div className="sobre-page">
      <header className="sobre-header">
        <Link href="/" className="sobre-back">
          ← Voltar
        </Link>
      </header>

      <main className="sobre-main">
        <div className="sobre-card">

          <div className="sobre-logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6c0-1.1.9-2 2-2h7a2 2 0 0 1 2 2v13H4a2 2 0 0 1-2-2V6Z" />
              <path d="M13 6c0-1.1.9-2 2-2h5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-7V6Z" />
              <path d="M13 19v-6" />
            </svg>
          </div>

          <h1 className="sobre-title">Sobre o Plano Bíblico</h1>

          <div className="sobre-body">
            <p>
              Este projeto nasceu de uma frustração simples: eu queria ler a Bíblia de forma
              organizada, no meu ritmo, escolhendo exatamente os livros que queria — e não
              encontrava nenhuma ferramenta que me desse esse controle.
            </p>

            <p>
              Os planos que existiam eram prontos, engessados. Ou você seguia o cronograma de
              outra pessoa, ou ficava sem plano. Para alguém que queria, por exemplo, ler só os
              livros poéticos em 40 dias ou percorrer os Evangelhos antes da Páscoa, não havia
              nada disponível que gerasse um PDF organizadinho para imprimir e usar no dia a dia.
            </p>

            <p>
              Resolvi então construir a ferramenta que eu mesmo precisava.
            </p>

            <div className="sobre-divider" />

            <h2>O propósito</h2>

            <p>
              Mais do que um gerador de PDF, o Plano Bíblico quer ser um incentivo à leitura
              das Escrituras. Acredito que ter um plano claro, personalizado e bonito na mão
              faz diferença — tira a sensação de que a Bíblia é grande demais para terminar
              e transforma em algo tangível, dia a dia.
            </p>

            <p>
              O app é completamente gratuito e sempre será. Não há anúncios, não há cadastro,
              não há coleta de dados. Só você e a Palavra.
            </p>

            <div className="sobre-divider" />

            <h2>Quem fez</h2>

            <p>
              Me chamo <strong>Paulo Henrique Dias</strong>. Sou desenvolvedor e cristão — e
              esse projeto é a interseção das duas coisas que mais gosto de fazer: construir
              ferramentas úteis e incentivar as pessoas a lerem a Bíblia.
            </p>

            <p>
              Se o app te ajudou de alguma forma, considere contribuir com um PIX para manter
              o projeto no ar. Qualquer valor é bem-vindo e muito apreciado.
            </p>
          </div>

          <blockquote className="sobre-versiculo">
            <p>
              "Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão,
              para a correção, para a educação na justiça, a fim de que o homem de Deus seja
              perfeito e perfeitamente habilitado para toda boa obra."
            </p>
            <cite>2 Timóteo 3:16-17</cite>
          </blockquote>

          <Link href="/" className="sobre-cta">
            Criar meu plano →
          </Link>

        </div>
      </main>
    </div>
  );
}
