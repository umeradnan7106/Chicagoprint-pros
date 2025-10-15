// // app/routes/api.public-products.ts
// import { json } from "@remix-run/node";


// export const loader = async () => {
//   const products = [
//     {
//       id: 1,
//       title: "Custom T-Shirt",
//       price: 20,
//       image: "https://chicago-dev-app.myshopify.com/cdn/shop/files/Main_b13ad453-477c-4ed1-9b43-81f3345adfd6.jpg?v=1759311469&width=1100",
//       variants: [
//         { id: 101, title: "Small / Red", price: 20 },
//         { id: 102, title: "Medium / Blue", price: 22 },
//       ],
//     },
//   ];

//   return json(products, {
//     headers: {
//       "Access-Control-Allow-Origin": "*", // ✅ Shopify theme se call allow
//     },
//   });
// };

// app/routes/api.public-products.ts
import { json } from "@remix-run/node";
import { prisma } from "../db.server";

// Loader for public products (App Proxy safe)
export const loader = async () => {
  const products = await prisma.customProduct.findMany({
    include: { variants: true },
  });

  return json(products, {
    headers: {
      "Access-Control-Allow-Origin": "*", // optional for testing
    },
  });
};
