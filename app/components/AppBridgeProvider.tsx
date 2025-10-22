// app/components/AppBridgeProvider.tsx
import React, { useEffect, useState } from "react";
import { createApp, AppConfig } from "@shopify/app-bridge";

interface Props {
  apiKey: string;
  host?: string | null;
  children: React.ReactNode;
}

export default function AppBridgeProvider({ apiKey, host, children }: Props) {
  const [appBridge, setAppBridge] = useState<any>(null);

  useEffect(() => {
    if (!apiKey || !host) return;

    const config: AppConfig = {
      apiKey,
      host,
      forceRedirect: true,
    };

    const app = createApp(config);
    setAppBridge(app);

    // Preserve host param across navigations
    const currentUrl = new URL(window.location.href);
    if (!currentUrl.searchParams.get("host")) {
      currentUrl.searchParams.set("host", host);
      window.history.replaceState({}, "", currentUrl.toString());
    }
  }, [apiKey, host]);

  return <>{children}</>;
}
