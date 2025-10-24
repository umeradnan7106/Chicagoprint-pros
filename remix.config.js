/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: [
    "@shopify/shopify-app-remix",
    "@shopify/app-bridge",
    "@shopify/polaris"
  ],
  publicEnv: ["SHOPIFY_API_KEY"],

  // ✅ This tells Remix to use your custom route map
  routes: async () => {
    const routes = await import("./app/routes.ts");
    return routes.default;
  }
};
