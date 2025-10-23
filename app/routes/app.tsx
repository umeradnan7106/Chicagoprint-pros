// // app/routes/app.tsx
// import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
// import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
// import { boundary } from "@shopify/shopify-app-remix/server";
// import { AppProvider } from "@shopify/shopify-app-remix/react";
// import { NavMenu } from "@shopify/app-bridge-react";
// import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

// import { authenticate } from "../shopify.server";

// export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   await authenticate.admin(request);

//   return { apiKey: process.env.SHOPIFY_API_KEY || "" };
// };

// export default function App() {
//   const { apiKey } = useLoaderData<typeof loader>();

//   return (
//     <AppProvider isEmbeddedApp apiKey={apiKey}>
//       <NavMenu>
//         <Link to="/app" rel="home">
//           Home
//         </Link>
//         {/* <Link to="/app/additional">Additional page</Link> */}
//         <Link to="/app/products">Product page</Link>
//       </NavMenu>
//       <Outlet />
//     </AppProvider>
//   );
// }

// // Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
// export function ErrorBoundary() {
//   return boundary.error(useRouteError());
// }

// export const headers: HeadersFunction = (headersArgs) => {
//   return boundary.headers(headersArgs);
// };



// app/routes/app.tsx
import type { HeadersFunction, LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

import { authenticate } from "../shopify.server";

// ✅ Polaris styles for embedded app
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: polarisStyles }
];

// ✅ Loader with proper json() response
export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

// ✅ Layout route with AppProvider and nested Outlet
export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        <Link to="/app" rel="home">Home</Link>
        <Link to="/app/products">Product page</Link>
      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

// ✅ Required for Shopify OAuth and CSP headers
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
