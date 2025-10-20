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
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { shop, topic } = await authenticate.webhook(request);
    console.log(`[Webhook] ${topic} received from ${shop}`);

    // Delete all sessions for this shop on uninstall
    const deleted = await prisma.session.deleteMany({ where: { shop } });
    console.log(
      `[Webhook] Deleted ${deleted.count} sessions for ${shop} on uninstall`
    );

    // Acknowledge fast
    return new Response("Session deleted", { status: 200 });
  } catch (error) {
    console.error(`[Webhook] Error in uninstalled:`, error);
    return new Response("Webhook error", { status: 500 });
  }
};
