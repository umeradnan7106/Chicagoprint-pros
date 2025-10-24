// // app/routes/Sidebar.tsx
// "use client";
// import { useEffect, useState } from "react";
// import type { Product } from "./app.ProductsPage";

// interface SidebarProps {
//   onSelect: (product: Product) => void;
//   selectedProduct: Product | null;
// }

// export default function Sidebar({ onSelect, selectedProduct }: SidebarProps) {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const res = await fetch("/api/chicago-app/products");
//         const data = await res.json();
//         setProducts(data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProducts();
//   }, []);

//   return (
//     <div className="sidebar">
//       <h2 className="Product-heading">Products</h2>
//       {loading && <p>Loading products...</p>}
//       {!loading && products.length === 0 && <p>No products found.</p>}

//       <ul>
//         {products.map((product) => (
//           <li
//             key={product.id}
//             onClick={() => onSelect(product)}
//             className={selectedProduct?.id === product.id ? "active" : ""}
//           >
//             {product.title}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// app/routes/Sidebar.tsx

import { useEffect, useState } from "react";
import type { Product } from "./app/products";

interface SidebarProps {
  onSelect: (product: Product) => void;
  selectedProduct: Product | null;
}

export default function Sidebar({ onSelect, selectedProduct }: SidebarProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/chicago-app/products");
        const data = await res.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.warn("Unexpected product format:", data);
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="sidebar">
      <h2 className="Product-heading">Products</h2>
      {loading && <p>Loading products...</p>}
      {!loading && products.length === 0 && <p>No products found.</p>}

      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            onClick={() => onSelect(product)}
            className={selectedProduct?.id === product.id ? "active" : ""}
          >
            {product.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
