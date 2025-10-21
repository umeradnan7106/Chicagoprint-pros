// // app/routes/webhooks.app.scopes_update.tsx
// import type { ActionFunctionArgs } from "@remix-run/node";
// import { authenticate } from "../shopify.server";
// import { prisma } from "../db.server";

// export const action = async ({ request }: ActionFunctionArgs) => {
//   try {
//     const { payload, session, topic, shop } = await authenticate.webhook(request);
//     console.log(`[Webhook] ${topic} received from ${shop}`);

//     const currentScopes = payload.current as string[];

//     if (!session) {
//       console.warn(`[Webhook] No session found for ${shop} — skipping scope update`);
//       return new Response("No session", { status: 200 });
//     }

//     await prisma.session.update({
//       where: { id: session.id },
//       data: { scope: currentScopes.join(",") },
//     });

//     console.log(`[Webhook] Scope updated for ${shop}: ${currentScopes.join(",")}`);
//     return new Response("Scope updated", { status: 200 });
//   } catch (error) {
//     console.error(`[Webhook] Error in scopes_update:`, error);
//     return new Response("Webhook error", { status: 500 });
//   }
// };


// app/routes/webhooks.app.scopes_update.tsx
import type { ActionFunctionArgs } from "@remix-run/node";
import shopify from "../shopify.server";
import { prisma } from "../db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { topic, shop, payload } = await shopify.authenticate.webhook(request);
    console.log(`[Webhook] ${topic} received from ${shop}`);

    const currentScopes =
      typeof (payload as any).current === "string"
        ? (payload as any).current
        : Array.isArray((payload as any).current)
        ? (payload as any).current.join(",")
        : "";

    if (currentScopes) {
      const updated = await prisma.session.updateMany({
        where: { shop },
        data: { scope: currentScopes },
      });
      console.log(`[Webhook] Scope updated for ${shop} → ${updated.count} sessions`);
    } else {
      console.warn(`[Webhook] No current scopes for ${shop}`);
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error(`[Webhook] scopes_update failed:`, error);
    // Return 200 so Shopify doesn’t retry infinitely
    return new Response("OK", { status: 200 });
  }
};
