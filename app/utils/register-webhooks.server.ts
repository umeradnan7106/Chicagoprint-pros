// app/utils/register-webhooks.server.ts
// import type { AdminApiContext } from "@shopify/shopify-app-remix/server";

// export async function registerWebhooks(admin: AdminApiContext) {
//   const topics = [
//     {
//       topic: "APP_UNINSTALLED",
//       url: `${process.env.SHOPIFY_APP_URL}/webhooks/app/uninstalled`,
//     },
//     {
//       topic: "APP_SCOPES_UPDATE",
//       url: `${process.env.SHOPIFY_APP_URL}/webhooks/app/scopes_update`,
//     },
//   ];

//   for (const { topic, url } of topics) {
//     const response = await admin.graphql(
//       `#graphql
//       mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
//         webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {
//           userErrors { field message }
//           webhookSubscription { id uri }
//         }
//       }`,
//       {
//         variables: {
//           topic,
//           webhookSubscription: { callbackUrl: url },
//         },
//       }
//     );

//     console.log(`✅ Registered ${topic} webhook → ${url}`);
//     console.log("Response:", JSON.stringify(response, null, 2));
//   }
// }



// app/utils/register-webhooks.server.ts
export async function registerWebhooks(admin: any) {
  const topics = [
    {
      topic: "APP_UNINSTALLED",
      url: `${process.env.SHOPIFY_APP_URL}/webhooks/app/uninstalled`,
    },
    {
      topic: "APP_SCOPES_UPDATE",
      url: `${process.env.SHOPIFY_APP_URL}/webhooks/app/scopes_update`,
    },
  ];

  for (const { topic, url } of topics) {
    const response = await admin.graphql(
      `#graphql
      mutation webhookSubscriptionCreate(
        $topic: WebhookSubscriptionTopic!
        $webhookSubscription: WebhookSubscriptionInput!
      ) {
        webhookSubscriptionCreate(
          topic: $topic
          webhookSubscription: $webhookSubscription
        ) {
          userErrors {
            field
            message
          }
          webhookSubscription {
            id
          }
        }
      }`,
      {
        variables: {
          topic,
          webhookSubscription: { callbackUrl: url },
        },
      }
    );

    const errors = response?.body?.data?.webhookSubscriptionCreate?.userErrors;
    const registeredUri = response?.body?.data?.webhookSubscriptionCreate?.webhookSubscription?.uri;

    if (errors?.length) {
      console.warn(`⚠️ Failed to register ${topic} webhook`, errors);
    } else {
      console.log(`✅ Registered ${topic} webhook → ${registeredUri}`);
    }
  }
}
