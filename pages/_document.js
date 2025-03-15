import Document, { Html, Head, Main, NextScript } from "next/document";
import { NextUIProvider } from "@nextui-org/react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Inject NextUI CSS */}
          <style
            id="nextui-styles"
            dangerouslySetInnerHTML={{
              __html: require("@nextui-org/react").getCssText(),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
