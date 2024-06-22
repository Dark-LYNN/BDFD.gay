// @/pages/_app.tsx
import Footer from '@/components/layout/footer';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/layout/navbar';
import '@/public/assets/css/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  const isExcludedPage = Component.name === 'Custom404';

  const page = pageProps.__NEXT_DATA__?.page || '/';
  const pathname = typeof page === 'string' ? page : '/';
  const pageTitle = pathname.charAt(1).toUpperCase() + pathname.slice(2) || 'Home';
  const title = `BDFD.gay`; // | ${pageTitle}
  const is404Page = pathname === '/404';
  const isHomePage = pathname === '/';
  const canonical = `https://bdfd.gay${pathname}`;

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Dev Credit */}
        <meta name="author" content="Lynnux" />

        {/* Browser walking */}
        <meta name="description" content="The home page from bdfd.gay"/>
        <meta name="language" content="en" />
        <link rel="canonical" href={canonical} />
        <title>{title}</title>

        {/* Embedding */}
        <meta name="theme-color" content="#ff47ff" />
        <meta property="og:site_name" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="./assets/favicon.png" />
        <meta property="og:image:secure_url" content="/assets/favicon.png" />
        <meta property="og:description" content="The home page from bdfd.gay."/>

        {/* Favicon */}
        <link rel="shortcut icon" href="/assets/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/assets/favicon.png" />

        {/* 404.tsx Only */}
        {is404Page && <meta name="robots" content="noindex" />}
        {isHomePage && <meta name="robots" content="index, follow" />}
      </Head>
      <SessionProvider session={pageProps.session}>
        <Navbar {...pageProps} />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </>
  );
}

export default MyApp;
