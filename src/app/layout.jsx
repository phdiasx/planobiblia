import "./globals.css";

const BASE_URL = "https://planobiblia.com.br";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Plano de Leitura Bíblica — Crie seu plano personalizado e baixe em PDF",
    template: "%s | Plano Bíblico",
  },
  description:
    "Monte um plano de leitura bíblica personalizado: escolha os livros, defina seu ritmo e gere um PDF para impressão. Bíblia Protestante (66 livros) e Católica (73 livros). 100% gratuito, sem cadastro.",
  keywords: [
    "plano de leitura bíblica",
    "plano bíblico",
    "plano bíblico personalizado",
    "ler a bíblia em 1 ano",
    "bíblia em 1 ano",
    "leitura bíblica diária",
    "cronograma de leitura bíblica",
    "plano de leitura bíblica pdf",
    "leitura bíblica sistemática",
    "como ler a bíblia",
    "plano bíblico gratuito",
    "bíblia completa",
    "bíblia católica",
    "bíblia protestante",
    "leitura cronológica da bíblia",
    "plano de leitura novo testamento",
  ],
  authors: [{ name: "Paulo Henrique Dias", url: BASE_URL }],
  creator: "Paulo Henrique Dias",
  publisher: "Paulo Henrique Dias",
  category: "religion",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Plano de Leitura Bíblica — Personalize e baixe em PDF",
    description: "Monte seu plano de leitura bíblica: escolha os livros, defina o ritmo e gere um PDF para impressão. Protestante (66) ou Católica (73 livros). Grátis.",
    url: BASE_URL,
    locale: "pt_BR",
    type: "website",
    siteName: "Plano Bíblico",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Plano de Leitura Bíblica" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plano de Leitura Bíblica — Personalize e baixe em PDF",
    description: "Monte seu plano de leitura bíblica e gere um PDF para impressão. Grátis.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Plano Bíblico",
  "url": "https://planobiblia.com.br",
  "description": "Monte um plano de leitura bíblica personalizado: escolha os livros, defina seu ritmo e gere um PDF para impressão.",
  "applicationCategory": "ReligiousApp",
  "operatingSystem": "Web",
  "browserRequirements": "Requires JavaScript",
  "inLanguage": "pt-BR",
  "isAccessibleForFree": true,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL",
  },
  "author": {
    "@type": "Person",
    "name": "Paulo Henrique Dias",
  },
  "featureList": [
    "Plano de leitura bíblica personalizado",
    "Suporte a Bíblia Protestante e Católica",
    "Exportação em PDF com 4 modelos",
    "Leitura cronológica",
    "Funciona offline",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-J0FQGYN4F6" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-J0FQGYN4F6');
        `}} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#C49A1C" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var t = localStorage.getItem('theme') ||
              (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', t);
          } catch(e) {}
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
