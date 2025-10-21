// // app/routes/webhooks.app.uninstalled.tsx
// import type { ActionFunctionArgs } from "@remix-run/node";
// import { authenticate } from "../shopify.server";
// import { prisma } from "../db.server";

// export const action = async ({ request }: ActionFunctionArgs) => {
//   try {
//     const { shop, session, topic } = await authenticate.webhook(request);
//     console.log(`[Webhook] ${topic} received from ${shop}`);

//     const deleted = await prisma.session.deleteMany({ where: { shop } });

//     console.log(`[Webhook] Deleted ${deleted.count} sessions for ${shop}`);
//     return new Response("Session deleted", { status: 200 });
//   } catch (error) {
//     console.error(`[Webhook] Error in uninstalled:`, error);
//     return new Response("Webhook error", { status: 500 });
//   }
// };


// app/routes/webhooks.app.uninstalled.tsx
import type { ActionFunctionArgs } from "@remix-run/node";
import shopify from "../shopify.server";
import { prisma } from "../db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { topic, shop } = await shopify.authenticate.webhook(request);
    console.log(`[Webhook] ${topic} received from ${shop}`);

    const deleted = await prisma.session.deleteMany({ where: { shop } });
    console.log(`[Webhook] Deleted ${deleted.count} sessions for ${shop}`);

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error(`[Webhook] uninstall failed:`, error);
    // Still respond 200 to stop retries
    return new Response("OK", { status: 200 });
  }
};
