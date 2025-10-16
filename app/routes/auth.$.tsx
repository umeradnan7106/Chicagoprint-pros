import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { registerWebhooks } from "../utils/register-webhooks.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request); // GraphQL client only

  await registerWebhooks(admin);

  return new Response(null, {
    status: 302,
    headers: { Location: "/app" },
  });
};
