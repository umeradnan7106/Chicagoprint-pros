// // app/routes/app._index.tsx
// import type { LoaderFunctionArgs } from "@remix-run/node";
// import { Page, Layout, Card, Text, BlockStack, Box } from "@shopify/polaris";
// import { TitleBar } from "@shopify/app-bridge-react";
// import { authenticate } from "../shopify.server";

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   await authenticate.admin(request);
//   return null;
// };

// export default function Index() {
//   return (
//     <Page title="Welcome to Chicago Product App">
//       <TitleBar title="Chicago Product App" />

//       <Layout>
//         <Layout.Section>
//           <Card>
//             <Box padding="600">
//               <BlockStack gap="400" align="center">
//                 <Text variant="heading2xl" as="h1">
//                   👋 Welcome to <strong>Chicago App</strong>
//                 </Text>

//                 <Text as="p" tone="subdued" alignment="center">
//                   A custom Shopify solution built to simplify your store management,
//                   product handling, and app integration — all in one place.
//                 </Text>

//                 <Text as="p" tone="subdued" alignment="center">
//                   Explore your dashboard, manage variants, and enhance your product experience
//                   seamlessly with the Chicago App.
//                 </Text>
//               </BlockStack>
//             </Box>
//           </Card>
//         </Layout.Section>
//       </Layout>
//     </Page>
//   );
// }



import type { LoaderFunctionArgs } from "@remix-run/node";
import { Page, Layout, Card, Text, BlockStack, Box } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  return (
    <Page title="Welcome to Chicago Product App">
      <TitleBar title="Chicago Product App" />
      <Layout>
        <Layout.Section>
          <Card>
            <Box padding="600">
              <BlockStack gap="400" align="center">
                <Text variant="heading2xl" as="h1">
                  👋 Welcome to <strong>Chicago App</strong>
                </Text>
                <Text as="p" tone="subdued" alignment="center">
                  A custom Shopify solution built to simplify your store management,
                  product handling, and app integration — all in one place.
                </Text>
              </BlockStack>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
