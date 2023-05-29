import "@ui/styles/globals.css";
import { Toaster } from "ui";
import { Providers } from "./providers";
import NextTopLoader from "nextjs-toploader";
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-screen">
        <NextTopLoader color="#7C3AED" />
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
