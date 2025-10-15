// // app/routes/SaveButton.tsx
// "use client";
// import { useState } from "react";

// interface SaveButtonProps {
//   product: any;
//   variants: any[];
// }

// export default function SaveButton({ product, variants }: SaveButtonProps) {
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSave = async () => {
//     setSaving(true);
//     setMessage("");

//     try {
//       const res = await fetch("/api/save-product", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           productId: product?.id,
//           title: product?.title,
//           image: product?.image,
//           basePrice: product?.price,
//           variants: Array.isArray(variants) ? variants : [], // ✅ force array
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to save product");

//       setMessage("✅ Product saved successfully!");
//     } catch (err) {
//       console.error("SaveButton error:", err);
//       setMessage("❌ Failed to save product");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleSave} disabled={saving}>
//         {saving ? "Saving..." : "Save Product"}
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import "./styles/design-uploader.css";

interface SaveButtonProps {
  product: any;
  variants: any[];
}

export default function SaveButton({ product, variants }: SaveButtonProps) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/save-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product?.id,
          title: product?.title,
          image: product?.image,
          basePrice: product?.price,
          variants: Array.isArray(variants) ? variants : [],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save product");

      setMessage("✅ Product saved successfully!");
    } catch (err) {
      console.error("SaveButton error:", err);
      setMessage("❌ Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="save-button-wrapper">
      <button
        className="save-button"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "💾 Save Product"}
      </button>
      {message && (
        <p className={`save-message ${message.startsWith("✅") ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
