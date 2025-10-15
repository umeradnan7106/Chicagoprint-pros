// // app/routes/ProductPreview.tsx
// import type { Product } from "./app.ProductsPage";

// interface ProductPreviewProps {
//   product: Product;
//   variants: any;
// }

// export default function ProductPreview({ product }: ProductPreviewProps) {
//   return (
//     <div className="product-preview">
//       <img src={product.image} alt={product.title} width={250} />
//       <h3>{product.title}</h3>
//       <p>${product.price}</p>
//     </div>
//   );
// }

import type { Product } from "./app.ProductsPage";
import "./styles/design-uploader.css";

interface ProductPreviewProps {
  product: Product;
  variants: any;
}

export default function ProductPreview({ product, variants }: ProductPreviewProps) {
  // Extract unique Size and Color values from variant titles
  const sizes = Array.from(new Set(
    variants.map((v: any) => v.title.split(" / ")[0])
  ));

  const colors = Array.from(new Set(
    variants.map((v: any) => v.title.split(" / ")[1])
  ));

  return (
    <div className="product-preview-card">
      <img src={product.image} alt={product.title} className="product-preview-image" />
      <div className="product-preview-details">
        <h3>{product.title}</h3>
        <p className="product-price">${product.price}</p>

        {sizes.length > 0 && (
          <p className="product-options">
            <strong>Sizes:</strong> {sizes.join(", ")}
          </p>
        )}
        {colors.length > 0 && (
          <p className="product-options">
            <strong>Colors:</strong> {colors.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
