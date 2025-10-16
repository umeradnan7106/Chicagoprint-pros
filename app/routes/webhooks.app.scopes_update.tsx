// // app/routes/webhooks.app.scopes_update.tsx
// import type { ActionFunctionArgs } from "@remix-run/node";
// import { authenticate } from "../shopify.server";
// import {prisma} from "../db.server";

// export const action = async ({ request }: ActionFunctionArgs) => {
//     const { payload, session, topic, shop } = await authenticate.webhook(request);
//     console.log(`Received ${topic} webhook for ${shop}`);

//     const current = payload.current as string[];
//     if (session) {
//         await prisma.session.update({   
//             where: {
//                 id: session.id
//             },
//             data: {
//                 scope: current.toString(),
//             },
//         });
//     }
//     return new Response();
// };

// app/routes/webhooks.app.scopes_update.tsx
import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const { payload, session, topic, shop } = await authenticate.webhook(request);
    console.log(`[Webhook] ${topic} received from ${shop}`);

    const currentScopes = payload.current as string[];

    if (!session) {
      console.warn(`[Webhook] No session found for ${shop} — skipping scope update`);
      return new Response("No session", { status: 200 });
    }

    await prisma.session.update({
      where: { id: session.id },
      data: { scope: currentScopes.join(",") },
    });

    console.log(`[Webhook] Scope updated for ${shop}: ${currentScopes.join(",")}`);
    return new Response("Scope updated", { status: 200 });
  } catch (error) {
    console.error(`[Webhook] Error in scopes_update:`, error);
    return new Response("Webhook error", { status: 500 });
  }
};
