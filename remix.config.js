/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: [
    "@shopify/shopify-app-remix",
    "@shopify/app-bridge",
    "@shopify/polaris",
  ],
  publicEnv: ["SHOPIFY_API_KEY"], // 👈 very important
};
