// import { json } from "@remix-run/node";
// import type { ActionFunction } from "@remix-run/node";

// // ⚠️ Abhi ke liye in-memory store (replace with DB like Prisma/Postgres)
// let savedProducts: any[] = [];

// export const action: ActionFunction = async ({ request }) => {
//   try {
//     const body = await request.json();

//     // Save product in memory (replace with DB insert)
//     savedProducts = savedProducts.filter(p => p.productId !== body.productId);
//     savedProducts.push(body);

//     return json({ success: true });
//   } catch (error) {
//     console.error("Save error:", error);
//     return json({ error: "Failed to save" }, { status: 500 });
//   }
// };

// // Helper to access saved products (for public API)
// export function getSavedProducts() {
//   return savedProducts;
// }


// import { json } from "@remix-run/node";
// import type { ActionFunction } from "@remix-run/node";
// import { prisma } from "../db.server";

// export const action: ActionFunction = async ({ request }) => {
//   try {
//     const body = await request.json();

//     const product = await prisma.customProduct.upsert({
//       where: { shopifyId: String(body.productId) },
//       update: {
//         title: body.title,
//         image: body.image,
//         basePrice: body.basePrice,
//         variants: {
//           deleteMany: {}, // purane variants hatao
//           create: body.variants.map((v: any) => ({
//             title: v.title,
//             price: v.price,
//           })),
//         },
//       },
//       create: {
//         shopifyId: String(body.productId),
//         title: body.title,
//         image: body.image,
//         basePrice: body.basePrice,
//         variants: {
//           create: body.variants.map((v: any) => ({
//             title: v.title,
//             price: v.price,
//           })),
//         },
//       },
//     });

//     return json({ success: true, product });
//   } catch (error) {
//     console.error("Save error:", error);
//     return json({ error: "Failed to save" }, { status: 500 });
//   }
// };


// app/routes/api.save-product.ts
import { json } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { prisma } from "../db.server";

export const action: ActionFunction = async ({ request }) => {
  try {
    const body = await request.json();

    if (!body.productId || !body.title) {
      return json({ error: "Missing product data" }, { status: 400 });
    }

    // ✅ Ensure variants is always an array
    const variants: any[] = Array.isArray(body.variants) ? body.variants : [];

    const product = await prisma.customProduct.upsert({
      where: { shopifyId: String(body.productId) },
      update: {
        title: body.title,
        image: body.image,
        basePrice: parseFloat(body.basePrice),
        variants: {
          deleteMany: {}, // purane variants hatao
          create: variants.map((v: any) => ({
            title: v.title,
            price: parseFloat(v.price), // ✅ always convert to float
            inventory: v.inventory || 0,
          }))

        },
      },
      create: {
        shopifyId: String(body.productId),
        title: body.title,
        image: body.image,
        basePrice: parseFloat(body.basePrice),
        variants: {
          create: variants.map((v: any) => ({
            title: v.title,
            price: parseFloat(v.price), // ✅ always convert to float
            inventory: v.inventory || 0,
          }))

        },
      },
    });

    return json({ success: true, product });
  } catch (error: any) {
    console.error("Save error:", error);
    return json({ error: error.message || "Failed to save product" }, { status: 500 });
  }
};
