// ✅ app/routes/webhooks.test.tsx
import type { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const payload = await request.text();

    console.log("✅ Webhook received successfully!");
    console.log("📦 Payload:", payload);

    return new Response("Webhook received successfully", { status: 200 });
  } catch (error) {
    console.error("❌ Webhook test failed:", error);
    return new Response("Webhook error", { status: 500 });
  }
};
