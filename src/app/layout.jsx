import "./globals.css";

export const metadata = {
  title: "Plano Bíblico — Crie seu plano de leitura personalizado",
  description:
    "Crie um plano de leitura bíblica personalizado: escolha os livros, defina o ritmo diário e gere um PDF para impressão. Gratuito e funciona offline.",
  keywords:
    "plano de leitura bíblica, plano bíblico, ler a bíblia, bíblia em 1 ano, leitura bíblica diária",
  openGraph: {
    title: "Plano Bíblico",
    description: "Crie seu plano de leitura bíblica personalizado e gere um PDF para impressão.",
    locale: "pt_BR",
    type: "website",
    siteName: "Plano Bíblico",
  },
  twitter: {
    card: "summary",
    title: "Plano Bíblico",
    description: "Crie seu plano de leitura bíblica personalizado.",
  },
  metadataBase: new URL("https://planobiblia.com.br"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#C49A1C" />
        {/* Evita flash de tema errado antes da hidratação */}
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
