// // app/routes/webhooks.app.uninstalled.tsx
// import type { ActionFunctionArgs } from "@remix-run/node";
// import { authenticate } from "../shopify.server";
// import {prisma} from "../db.server";

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const { shop, session, topic } = await authenticate.webhook(request);

//   console.log(`Received ${topic} webhook for ${shop}`);

//   // Webhook requests can trigger multiple times and after an app has already been uninstalled.
//   // If this webhook already ran, the session may have been deleted previously.
//   if (session) {
//     await prisma.session.deleteMany({ where: { shop } });
//   }

//   return new Response();
// };


// app/routes/webhooks.app.uninstalled.tsx
import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { shop, session, topic } = await authenticate.webhook(request);
    console.log(`[Webhook] ${topic} received from ${shop}`);

    const deleted = await prisma.session.deleteMany({ where: { shop } });

    console.log(`[Webhook] Deleted ${deleted.count} sessions for ${shop}`);
    return new Response("Session deleted", { status: 200 });
  } catch (error) {
    console.error(`[Webhook] Error in uninstalled:`, error);
    return new Response("Webhook error", { status: 500 });
  }
};
