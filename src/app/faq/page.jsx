import Link from "next/link";

const faqs = [
  {
    q: "O Plano Bíblico é gratuito?",
    a: "Sim, completamente gratuito. Não há planos pagos, não há cadastro. Você cria seu plano, baixa o PDF e pronto — sem custo algum.",
  },
  {
    q: "Preciso criar uma conta para usar?",
    a: "Não. O Plano Bíblico não exige nenhum cadastro nem login. Acesse o site, configure seu plano e baixe o PDF diretamente, sem fornecer nenhum dado pessoal.",
  },
  {
    q: "Quantos capítulos tem a Bíblia?",
    a: "A Bíblia Protestante tem 66 livros e 1.189 capítulos. A Bíblia Católica, que inclui os livros deuterocanônicos, tem 73 livros. Para ler em 1 ano lendo todos os dias, você precisa de aproximadamente 3 a 4 capítulos por dia.",
  },
  {
    q: "Qual a diferença entre a Bíblia Protestante e a Católica?",
    a: "A Bíblia Protestante tem 66 livros (39 no Antigo Testamento e 27 no Novo Testamento). A Bíblia Católica tem 73 livros, incluindo 7 livros deuterocanônicos: Tobias, Judite, 1 Macabeus, 2 Macabeus, Sabedoria, Eclesiástico (Sirácides) e Baruc. O Plano Bíblico suporta as duas versões.",
  },
  {
    q: "Como faço para ler a Bíblia em 1 ano?",
    a: "Selecione todos os livros da Bíblia no Plano Bíblico, defina 3 a 4 capítulos por dia e escolha a data de início. O app calculará automaticamente o cronograma para você terminar em cerca de 1 ano. Depois é só baixar o PDF e seguir o plano dia a dia.",
  },
  {
    q: "O que é a leitura cronológica da Bíblia?",
    a: "A leitura cronológica organiza os livros e passagens da Bíblia na ordem histórica dos eventos, e não na ordem canônica em que aparecem nas nossas Bíblias. Por exemplo, Jó é lido durante o Gênesis, os Salmos são lidos junto ao reinado de Davi, e as cartas de Paulo aparecem intercaladas com Atos dos Apóstolos. Essa abordagem ajuda a entender melhor o contexto histórico das narrativas bíblicas.",
  },
  {
    q: "Por que alguns recomendam começar pelo Novo Testamento?",
    a: "Muitos pastores e padres sugerem começar pelos quatro Evangelhos e as Epístolas para estabelecer a base teológica cristã antes de mergulhar nas narrativas do Antigo Testamento. Conhecer o cumprimento das promessas em Jesus ajuda a entender melhor as profecias e histórias do AT. O Plano Bíblico oferece um preset 'NT → Antigo Testamento' que organiza essa leitura automaticamente.",
  },
  {
    q: "Posso escolher ler apenas alguns livros da Bíblia?",
    a: "Sim. O Plano Bíblico permite selecionar exatamente os livros que você quer ler — desde um único livro, como Salmos ou Provérbios, até toda a Bíblia. Você também pode escolher planos prontos como os Evangelhos, os livros de Sabedoria ou o Novo Testamento completo.",
  },
  {
    q: "Posso imprimir o plano gerado?",
    a: "Sim. O Plano Bíblico gera um PDF otimizado para impressão com 4 modelos visuais diferentes (Clássico, Moderno, Escuro e Dourado). Cada página traz a data e os capítulos a ler, com colunas para marcar cada dia concluído.",
  },
  {
    q: "Posso compartilhar meu plano com outras pessoas?",
    a: "Sim. O Plano Bíblico gera um link único que salva todas as configurações do seu plano — livros escolhidos, ritmo de leitura e data de início. Basta copiar e enviar para alguém usar o mesmo plano, ideal para grupos de leitura bíblica.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export const metadata = {
  title: "Perguntas Frequentes — Plano de Leitura Bíblica",
  description: "Tire suas dúvidas sobre o Plano Bíblico: como funciona, se é gratuito, diferença entre Bíblia Protestante e Católica, leitura cronológica e muito mais.",
  alternates: { canonical: "https://planobiblia.com.br/faq" },
  openGraph: {
    title: "Perguntas Frequentes — Plano de Leitura Bíblica",
    description: "Tire suas dúvidas sobre o Plano Bíblico: como funciona, se é gratuito, leitura cronológica e mais.",
    url: "https://planobiblia.com.br/faq",
    type: "website",
  },
};

export default function FaqPage() {
  return (
    <div className="sobre-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <header className="sobre-header">
        <Link href="/" className="sobre-back">← Voltar ao app</Link>
      </header>

      <main className="sobre-main">
        <div className="sobre-card">
          <h1 className="sobre-title">Perguntas Frequentes</h1>

          <div className="sobre-body">
            {faqs.map(({ q, a }, i) => (
              <div key={i}>
                <h2>{q}</h2>
                <p>{a}</p>
                {i < faqs.length - 1 && <div className="sobre-divider" />}
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", opacity: 0.6 }}>
            Veja também:{" "}
            <Link href="/plano-biblia-1-ano" style={{ color: "var(--accent)" }}>
              Como ler a Bíblia em 1 ano
            </Link>
          </p>

          <Link href="/" className="sobre-cta" style={{ marginTop: "16px" }}>
            Criar meu plano →
          </Link>
        </div>
      </main>
    </div>
  );
}
