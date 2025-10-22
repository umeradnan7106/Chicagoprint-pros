// // app/routes/api.chicago-app.products.ts
// import { json } from "@remix-run/node";

// export const loader = async () => {
//   try {
//     // 🌿 Environment variables from .env.local
//     const SHOPIFY_SHOP_DOMAIN = process.env.SHOPIFY_SHOP_DOMAIN!;
//     const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;

//     if (!SHOPIFY_SHOP_DOMAIN || !SHOPIFY_ADMIN_TOKEN) {
//       throw new Error("Missing Shopify credentials in environment variables.");
//     }

//     // 🔗 Shopify Admin API endpoint
//     const url = `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2025-01/products.json`;

//     // 📦 Fetch products from Shopify
//     const res = await fetch(url, {
//       headers: {
//         "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("Shopify API Error:", text);
//       return json({ error: text }, { status: res.status });
//     }

//     const data = await res.json();

//     // 🧩 Format products for your Chicago App frontend
//     const products = data.products.map((p: any) => ({
//       id: p.id,
//       title: p.title,
//       price: p.variants?.[0]?.price || "0.00",
//       image: p.images?.[0]?.src || p.image?.src || "",
//       variants: p.variants.map((v: any) => ({
//         id: v.id,
//         title: v.title,
//         price: v.price,
//       })),
//     }));

//     return json(products);
//   } catch (error) {
//     console.error("Server Error:", error);
//     return json({ error: "Failed to fetch products" }, { status: 500 });
//   }
// };


// app/routes/api.chicago-app.products.ts
import { json } from "@remix-run/node";

export const loader = async () => {
  try {
    const SHOPIFY_SHOP_DOMAIN = process.env.SHOPIFY_SHOP_DOMAIN!;
    const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN!;

    if (!SHOPIFY_SHOP_DOMAIN || !SHOPIFY_ADMIN_TOKEN) {
      throw new Error("Missing Shopify credentials in environment variables.");
    }

    const url = `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/2025-01/products.json`;

    const res = await fetch(url, {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Shopify API Error:", text);
      return json({ error: text }, { status: res.status });
    }

    const data = await res.json();

    const products = data.products.map((p: any) => {
      const variants = p.variants.map((v: any) => ({
        id: v.id,
        title: v.title,
        price: parseFloat(v.price),
        inventory: v.inventory_quantity ?? 0,
      }));

      // ✅ Extract Size and Color from variant titles
      const sizes = Array.from(new Set(
        variants.map((v: any) => v.title.split(" / ")[0])
      ));
      const colors = Array.from(new Set(
        variants.map((v: any) => v.title.split(" / ")[1])
      ));

      return {
        id: p.id,
        title: p.title,
        price: parseFloat(p.variants?.[0]?.price || "0.00"),
        image: p.images?.[0]?.src || p.image?.src || "",
        variants,
        options: [
          { name: "Size", values: sizes },
          { name: "Color", values: colors }
        ]
      };
    });

    return json(products);
  } catch (error) {
    console.error("Server Error:", error);
    return json({ error: "Failed to fetch products" }, { status: 500 });
  }
};
