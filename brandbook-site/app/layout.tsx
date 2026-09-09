import type { Metadata } from 'next';
import './globals.css';
import { publicAsset } from './brand/paths';

const siteUrl =
  process.env.BRANDBOOK_GITHUB_PAGES === '1'
    ? 'https://klkmoraa.github.io/fusionstructure-web'
    : 'https://fusionstructure-brandbook.crdrawin.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'FusionStructure · Brandbook',
  description:
    'Sistema visual y verbal de FusionStructure: marca estructural, seis familias, color con significado y movimiento que explica.',
  icons: { icon: publicAsset('/favicon.svg') },
  openGraph: {
    title: 'FusionStructure · Brandbook',
    description:
      'Make complexity legible. Marca, seis familias, señales, movimiento y voz con estado verificable.',
    images: [
      {
        url: '/og.png',
        width: 1536,
        height: 1024,
        alt: 'Sistema visual de FusionStructure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FusionStructure · Brandbook',
    description:
      'Make complexity legible. Marca, seis familias, señales, movimiento y voz con estado verificable.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
