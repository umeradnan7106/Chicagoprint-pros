// app/routes/app.ProductsPage.tsx
import Sidebar from "./Sidebar";
import ProductPreview from "./ProductPreview";
import SaveButton from "./SaveButton";
import "./styles/design-uploader.css";
import { useState } from "react";
import GroupedVariantEditor from "./GroupedVariantTable";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  variants: { id?: number; title: string; price: string | number; inventory: number }[];
}

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<any[]>([]);
  const [options, setOptions] = useState([
    { name: "Size", values: ["S", "M", "L"] },
    { name: "Color", values: ["White", "Black", "Orange"] },
  ]);

  return (
    <div className="uploader-container">
      <Sidebar onSelect={setSelectedProduct} selectedProduct={selectedProduct} />
      <div className="uploader-main">
        {selectedProduct ? (
          <>
            {/* 🧩 Product Preview First */}
            <ProductPreview product={selectedProduct} variants={variants} />

            {/* 🧩 Variant Builder */}
            <GroupedVariantEditor
              product={selectedProduct}
              options={options}
              setOptions={setOptions}
              variants={variants}
              setVariants={setVariants}
            />

            {/* 🧩 Save Button */}
            <div style={{ marginTop: "30px", textAlign: "right" }}>
              <SaveButton product={selectedProduct} variants={variants} />
            </div>
          </>
        ) : (
          <p className="uploader-placeholder">Select a product from sidebar 👈</p>
        )}
      </div>
    </div>
  );
}
