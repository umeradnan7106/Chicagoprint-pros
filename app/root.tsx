// // app/root.tsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { AppProvider as ShopifyAppProvider } from "@shopify/shopify-app-remix/react";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json" with { type: "json" };

import { addDocumentResponseHeaders } from "./shopify.server";

declare global {
  interface Window {
    __SHOPIFY_API_KEY__?: string;
    __SHOPIFY_DEV_API_KEY__?: string;
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const headers = new Headers();
  addDocumentResponseHeaders(request, headers);
  return json({}, { headers });
}

export default function App() {
  const apiKey =
    typeof window !== "undefined"
      ? window.__SHOPIFY_API_KEY__ || window.__SHOPIFY_DEV_API_KEY__
      : undefined;

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ShopifyAppProvider apiKey={apiKey!}>
          <PolarisProvider i18n={enTranslations}>
            <Outlet />
          </PolarisProvider>
        </ShopifyAppProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
