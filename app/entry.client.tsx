import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useEffect, useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { createApp, AppConfig } from "@shopify/app-bridge";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

// 🧩 Define a global window type (for Shopify API key)
declare global {
  interface Window {
    __SHOPIFY_API_KEY__?: string;
    __SHOPIFY_DEV_API_KEY__?: string;
  }
}

function ShopifyAppBridgeWrapper({ children }: { children: React.ReactNode }) {
  const [appBridge, setAppBridge] = useState<any>(null);

  useEffect(() => {
    // ✅ Extract host from query params
    const host = new URLSearchParams(window.location.search).get("host");
    const apiKey =
      window.__SHOPIFY_API_KEY__ || window.__SHOPIFY_DEV_API_KEY__;

    // 🧠 If host or apiKey missing, skip setup (prevents crashes)
    if (!host || !apiKey) {
      console.warn("⚠️ Missing Shopify AppBridge config:", { host, apiKey });
      return;
    }

    const appConfig: AppConfig = {
      apiKey,
      host,
      forceRedirect: true,
    };

    try {
      const app = createApp(appConfig);
      setAppBridge(app);
    } catch (error) {
      console.error("❌ Error initializing Shopify AppBridge:", error);
    }
  }, []);

  // ✅ Render children even before AppBridge initializes (SSR safe)
  return <>{children}</>;
}

function ClientApp() {
  return (
    <StrictMode>
      <ShopifyAppBridgeWrapper>
        <PolarisProvider i18n={enTranslations}>
          <RemixBrowser />
        </PolarisProvider>
      </ShopifyAppBridgeWrapper>
    </StrictMode>
  );
}

// ✅ Ensure hydration only runs after DOM is ready
startTransition(() => {
  hydrateRoot(document, <ClientApp />);
});
