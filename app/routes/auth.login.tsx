// app/routes/auth.login.tsx
import type { LoaderFunctionArgs } from "@remix-run/node";
import { login } from "../shopify.server";

// This handles /auth/login redirects
export const loader = async ({ request }: LoaderFunctionArgs) => {
  return login(request);
};
