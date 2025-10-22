// import {
//   Links,
//   Meta,
//   Outlet,
//   Scripts,
//   ScrollRestoration,
//   useRouteError,
// } from "@remix-run/react";
// import { json, type LoaderFunctionArgs } from "@remix-run/node";
// import { AppProvider as ShopifyAppProvider } from "@shopify/shopify-app-remix/react";
// import { AppProvider as PolarisProvider } from "@shopify/polaris";
// import enTranslations from "@shopify/polaris/locales/en.json" with { type: "json" };

// import { addDocumentResponseHeaders } from "./shopify.server";

// declare global {
//   interface Window {
//     __SHOPIFY_API_KEY__?: string;
//     __SHOPIFY_DEV_API_KEY__?: string;
//   }
// }

// // ✅ Ensure Remix sets all Shopify-related headers
// export async function loader({ request }: LoaderFunctionArgs) {
//   const headers = new Headers();
//   addDocumentResponseHeaders(request, headers);
//   return json({}, { headers });
// }

// export default function App() {
//   // ✅ Safe fallback for both local + production
//   const apiKey =
//     typeof window !== "undefined"
//       ? window.__SHOPIFY_API_KEY__ || window.__SHOPIFY_DEV_API_KEY__
//       : process.env.SHOPIFY_API_KEY;

//   return (
//     <html lang="en">
//       <head>
//         <Meta />
//         <Links />
//         <title>Chicago Product App</title>
//       </head>
//       <body>
//         {/* ✅ Providers for Shopify & Polaris */}
//         <ShopifyAppProvider apiKey={apiKey!}>
//           <PolarisProvider i18n={enTranslations}>
//             <Outlet />
//           </PolarisProvider>
//         </ShopifyAppProvider>

//         {/* Remix essentials */}
//         <ScrollRestoration />
//         <Scripts />

//         {/* Fallback message */}
//         <noscript>
//           You need to enable JavaScript to run this Shopify app.
//         </noscript>
//       </body>
//     </html>
//   );
// }

// // ✅ Basic global error boundary — catches silent Remix or Shopify errors
// export function ErrorBoundary() {
//   const error = useRouteError();
//   console.error("💥 Remix Error:", error);

//   return (
//     <html>
//       <head>
//         <title>App Error</title>
//       </head>
//       <body
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "100vh",
//           fontFamily: "sans-serif",
//         }}
//       >
//         <div style={{ textAlign: "center" }}>
//           <h1>Something went wrong 😢</h1>
//           <p>Please refresh or reinstall the app.</p>
//           <Scripts />
//         </div>
//       </body>
//     </html>
//   );
// }



import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { AppProvider as ShopifyAppProvider } from "@shopify/shopify-app-remix/react";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json" with { type: "json" };

import { addDocumentResponseHeaders } from "./shopify.server";

// 🧩 Declare global variables for TypeScript safety
declare global {
  interface Window {
    __SHOPIFY_API_KEY__?: string;
    __SHOPIFY_DEV_API_KEY__?: string;
  }
}

// ✅ Remix loader to attach Shopify headers
export async function loader({ request }: LoaderFunctionArgs) {
  const headers = new Headers();
  addDocumentResponseHeaders(request, headers);
  return json({}, { headers });
}

export default function App() {
  // ⚙️ Safe key fallback for both environments
  const apiKey =
    typeof window !== "undefined"
      ? window.__SHOPIFY_API_KEY__ || window.__SHOPIFY_DEV_API_KEY__
      : process.env.SHOPIFY_API_KEY || "";

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>Chicago Product App</title>
      </head>
      <body>
        {/* ✅ Inject API key into window (for AppBridge) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__SHOPIFY_API_KEY__ = "${process.env.SHOPIFY_API_KEY}";
              window.__SHOPIFY_DEV_API_KEY__ = "${process.env.SHOPIFY_API_KEY}";
            `,
          }}
        />

        {/* ✅ Shopify + Polaris providers */}
        <ShopifyAppProvider apiKey={apiKey ?? ""}>
          <PolarisProvider i18n={enTranslations}>
            <Outlet />
          </PolarisProvider>
        </ShopifyAppProvider>

        {/* ✅ Remix essentials */}
        <ScrollRestoration />
        <Scripts />

        {/* Fallback for JS-disabled users */}
        <noscript>You need to enable JavaScript to run this Shopify app.</noscript>
      </body>
    </html>
  );
}

// 🧱 Global error boundary — catches all Remix & Shopify runtime errors
export function ErrorBoundary() {
  const error = useRouteError();
  console.error("💥 Remix Error:", error);

  return (
    <html>
      <head>
        <title>App Error</title>
      </head>
      <body
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>Something went wrong 😢</h1>
          <p>Please refresh or reinstall the app.</p>
          <Scripts />
        </div>
      </body>
    </html>
  );
}
