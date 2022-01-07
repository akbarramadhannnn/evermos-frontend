import App from "next/app";
import Head from "next/head";
import Layout from "../layout";
import "../../public/static/assets/css/style.css";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps,
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout>
        <Head>
          <title>Evermos</title>
          <meta charSet="utf-8" />
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta property="og:title" content="" />
          <meta property="og:type" content="" />
          <meta property="og:url" content="" />
          <meta property="og:image" content="" />
        </Head>

        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
