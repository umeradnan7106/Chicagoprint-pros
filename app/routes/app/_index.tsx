// app/routes/app.index.tsx(rename : _index.tsx)
import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
} from "@shopify/polaris";
import shopify, { sessionStorage } from "../../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const cookie = request.headers.get("Cookie");
    const session = await sessionStorage.loadSession(cookie || "");

    if (!session?.shop) {
      console.log("❌ No session found, redirecting to login");
      const { redirect } = await shopify.authenticate.admin(request);
      return redirect("/auth/login");
    }

    console.log("✅ Session found:", session.shop);
    return json({ shop: session.shop });
  } catch (error) {
    console.error("🔥 Loader crashed:", error);
    return json({ error: "Session error" }, { status: 500 });
  }
};

export default function AppDashboard() {
  const data = useLoaderData<typeof loader>();

  if ("error" in data) {
    return (
      <Page title="Error">
        <Layout>
          <Layout.Section>
            <Text as="p">⚠️ Failed to load session: {data.error}</Text>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Page title="Chicago App Dashboard">
      <Layout>
        <Layout.Section>
          <Card>
            <Text as="p">✅ Welcome to your app, <strong>{data.shop}</strong></Text>
            <Text as="p">This is your embedded Shopify app dashboard.</Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
