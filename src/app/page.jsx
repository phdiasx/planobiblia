import Link from "next/link";
import App from "@/components/App";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O Plano Bíblico é gratuito?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim, completamente gratuito. Sem anúncios, sem cadastro, sem coleta de dados. Crie seu plano e baixe o PDF sem custo algum.",
      },
    },
    {
      "@type": "Question",
      name: "Quantos capítulos preciso ler por dia para ler a Bíblia em 1 ano?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Bíblia Protestante tem 1.189 capítulos. Para ler em 365 dias, você precisa de aproximadamente 3 a 4 capítulos por dia. O Plano Bíblico calcula o cronograma automaticamente com base no seu ritmo.",
      },
    },
    {
      "@type": "Question",
      name: "Qual a diferença entre Bíblia Protestante e Católica?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Bíblia Protestante tem 66 livros. A Católica tem 73, incluindo 7 livros deuterocanônicos: Tobias, Judite, 1 e 2 Macabeus, Sabedoria, Eclesiástico e Baruc. O Plano Bíblico suporta as duas versões.",
      },
    },
    {
      "@type": "Question",
      name: "Posso imprimir o plano gerado?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. O app gera um PDF otimizado para impressão com 4 modelos visuais. Cada página traz a data e os capítulos a ler, com espaço para marcar os dias concluídos.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <App />
      <section className="seo-section">
        <div className="seo-inner">
          <h2 className="seo-heading">Plano de Leitura Bíblica Personalizado e Gratuito</h2>
          <p className="seo-lead">
            Crie um cronograma de leitura bíblica adaptado ao seu ritmo. Escolha os livros,
            defina quantos capítulos ler por dia e baixe um PDF organizado para imprimir —
            tudo gratuitamente, sem cadastro.
          </p>

          <div className="seo-grid">
            <div className="seo-card">
              <h3>Ler a Bíblia em 1 ano</h3>
              <p>
                Com 3 a 4 capítulos por dia você percorre toda a Bíblia Protestante (1.189 capítulos)
                em cerca de 10 a 13 meses. O plano calcula o cronograma automaticamente.
              </p>
              <Link href="/plano-biblia-1-ano" className="seo-link">Como funciona →</Link>
            </div>
            <div className="seo-card">
              <h3>Bíblia Protestante ou Católica</h3>
              <p>
                Suporte completo às duas versões. A Bíblia Católica inclui 7 livros deuterocanônicos,
                totalizando 73 livros. Selecione sua versão antes de montar o plano.
              </p>
            </div>
            <div className="seo-card">
              <h3>Leitura Cronológica</h3>
              <p>
                Leia a Bíblia na ordem histórica dos eventos — Jó durante o Gênesis, Salmos com
                o reinado de Davi, Epístolas intercaladas com Atos. Uma perspectiva única das Escrituras.
              </p>
            </div>
            <div className="seo-card">
              <h3>PDF para impressão</h3>
              <p>
                4 modelos visuais diferentes. Cada página traz a data, os capítulos e um checkbox
                para marcar o progresso. Ideal para usar na Bíblia física.
              </p>
            </div>
          </div>

          <div className="seo-faq">
            <h2 className="seo-heading">Perguntas Frequentes</h2>
            <div className="seo-faq-list">
              <div className="seo-faq-item">
                <h3>O serviço é gratuito?</h3>
                <p>Sim. Não há anúncios, não há planos pagos, não há cadastro de nenhuma forma.</p>
              </div>
              <div className="seo-faq-item">
                <h3>Posso escolher apenas alguns livros?</h3>
                <p>Sim. Você pode selecionar desde um único livro (como Salmos ou Provérbios) até a Bíblia inteira.</p>
              </div>
              <div className="seo-faq-item">
                <h3>Posso compartilhar meu plano?</h3>
                <p>Sim. O app gera um link único com todas as configurações do seu plano, ideal para grupos de leitura.</p>
              </div>
              <div className="seo-faq-item">
                <h3>Funciona no celular?</h3>
                <p>Sim. O app é responsivo e funciona em qualquer dispositivo — celular, tablet ou computador.</p>
              </div>
            </div>
            <Link href="/faq" className="seo-link" style={{ marginTop: "16px", display: "inline-block" }}>
              Ver todas as perguntas →
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
