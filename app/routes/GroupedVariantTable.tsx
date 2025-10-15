// // app/routes/GroupedVariantTable.tsx
// import { useState } from "react";
// import "./styles/design-uploader.css";

// type VariantType = {
//   group: string;
//   title: string;
//   price: number | string;
//   inventory: number;
// };

// type OptionType = {
//   name: string;
//   values: string[];
// };

// interface Props {
//   product: {
//     title: string;
//   };
//   options: OptionType[];
//   setOptions: (opts: OptionType[]) => void;
//   variants: VariantType[];
//   setVariants: (v: VariantType[]) => void;
// }

// export default function GroupedVariantEditor({
//   product,
//   options,
//   setOptions,
//   variants,
//   setVariants,
// }: Props) {
//   const [bulkPrice, setBulkPrice] = useState<Record<string, number | string>>({});
//   const [bulkInventory, setBulkInventory] = useState<Record<string, number | string>>({});

//   const generateVariants = () => {
//     const [sizeOpt, colorOpt] = options;
//     const combos: VariantType[] = [];

//     for (const size of sizeOpt.values) {
//       for (const color of colorOpt.values) {
//         combos.push({
//           group: size,
//           title: `${size} / ${color}`,
//           price: "",
//           inventory: 0,
//         });
//       }
//     }

//     setVariants(combos);
//   };

//   const updateVariant = <K extends keyof VariantType>(index: number, field: K, value: VariantType[K]) => {
//     const updated = [...variants];
//     updated[index][field] = value;
//     setVariants(updated);
//   };

//   const deleteOptionValue = (optIndex: number, valIndex: number) => {
//     const updated = [...options];
//     const removed = updated[optIndex].values[valIndex];
//     updated[optIndex].values.splice(valIndex, 1);
//     setOptions(updated);

//     const filtered = variants.filter((v) => !v.title.includes(removed));
//     setVariants(filtered);
//   };

//   const applyBulkToGroup = (group: string) => {
//     const price = parseFloat(bulkPrice[group] as string);
//     const inventory = parseInt(bulkInventory[group] as string);

//     const updated = variants.map((v) =>
//       v.group === group ? { ...v, price, inventory } : v
//     );
//     setVariants(updated);
//   };

//   const deleteVariant = (index: number) => {
//     const updated = [...variants];
//     updated.splice(index, 1);
//     setVariants(updated);
//   };

//   const groups = Array.from(new Set(variants.map((v) => v.group))) as string[];

//   return (
//     <div className="variant-editor">
//       <h2 className="variant-title">🛠️ Configure Variants for <span>{product.title}</span></h2>

//       {/* Option Inputs */}
//       <div className="option-section">
//         {options.map((opt, i) => (
//           <div key={i} className="option-block">
//             <label>{opt.name}</label>
//             <div className="option-values">
//               {opt.values.map((val, j) => (
//                 <div key={j} className="option-value">
//                   <input
//                     type="text"
//                     value={val}
//                     onChange={(e) => {
//                       const updated = [...options];
//                       updated[i].values[j] = e.target.value;
//                       setOptions(updated);
//                     }}
//                   />
//                   <button className="delete-btn" onClick={() => deleteOptionValue(i, j)}>✕</button>
//                 </div>
//               ))}
//               <button className="add-btn" onClick={() => {
//                 const updated = [...options];
//                 updated[i].values.push("");
//                 setOptions(updated);
//               }}>➕ Add Value</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button className="generate-btn" onClick={generateVariants}>
//         🔄 Generate Variants
//       </button>

//       {/* Grouped Table */}
//       {variants.length > 0 && (
//         <div className="variant-table-section">
//           {groups.map((group) => (
//             <details key={group} className="variant-group">
//               <summary>{group}</summary>

//               <div className="bulk-inputs">
//                 <input
//                   type="number"
//                   placeholder="Bulk Price"
//                   value={bulkPrice[group] || ""}
//                   onChange={(e) =>
//                     setBulkPrice({ ...bulkPrice, [group]: e.target.value })
//                   }
//                 />
//                 <input
//                   type="number"
//                   placeholder="Bulk Inventory"
//                   value={bulkInventory[group] || ""}
//                   onChange={(e) =>
//                     setBulkInventory({ ...bulkInventory, [group]: e.target.value })
//                   }
//                 />
//                 <button onClick={() => applyBulkToGroup(group)}>Apply to all</button>
//               </div>

//               <table className="variant-table">
//                 <thead>
//                   <tr>
//                     <th>Variant</th>
//                     <th>Price</th>
//                     <th>Inventory</th>
//                     <th></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {variants
//                     .filter((v) => v.group === group)
//                     .map((v, i) => (
//                       <tr key={i}>
//                         <td>{v.title}</td>
//                         <td>
//                           <input
//                             type="number"
//                             value={v.price}
//                             onChange={(e) =>
//                               updateVariant(i, "price", parseFloat(e.target.value))
//                             }
//                           />
//                         </td>
//                         <td>
//                           <input
//                             type="number"
//                             value={v.inventory}
//                             onChange={(e) =>
//                               updateVariant(i, "inventory", parseInt(e.target.value))
//                             }
//                           />
//                         </td>
//                         <td>
//                           <button className="delete-btn" onClick={() => deleteVariant(i)}>✕</button>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </details>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import "./styles/design-uploader.css";

type VariantType = {
  group: string;
  title: string;
  price: number | string;
  inventory: number;
};

type OptionType = {
  name: string;
  values: string[];
};

interface Props {
  product: {
    title: string;
    id?: number;
  };
  options: OptionType[];
  setOptions: (opts: OptionType[]) => void;
  variants: VariantType[];
  setVariants: (v: VariantType[]) => void;
}

export default function GroupedVariantEditor({
  product,
  options,
  setOptions,
  variants,
  setVariants,
}: Props) {
  const [bulkPrice, setBulkPrice] = useState<Record<string, number | string>>({});
  const [bulkInventory, setBulkInventory] = useState<Record<string, number | string>>({});

  // 🧩 Load variants from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`variants-${product.title}`);
    if (saved) {
      setVariants(JSON.parse(saved));
    }
  }, [product.title, setVariants]);

  // 🧩 Save variants to localStorage whenever they change
  useEffect(() => {
    if (variants.length > 0) {
      localStorage.setItem(`variants-${product.title}`, JSON.stringify(variants));
    }
  }, [variants, product.title]);

  const generateVariants = () => {
    const [sizeOpt, colorOpt] = options;
    const combos: VariantType[] = [];

    for (const size of sizeOpt.values) {
      for (const color of colorOpt.values) {
        combos.push({
          group: size,
          title: `${size} / ${color}`,
          price: "",
          inventory: 0,
        });
      }
    }

    setVariants(combos);
  };

  const updateVariant = <K extends keyof VariantType>(index: number, field: K, value: VariantType[K]) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const deleteOptionValue = (optIndex: number, valIndex: number) => {
    const updated = [...options];
    const removed = updated[optIndex].values[valIndex];
    updated[optIndex].values.splice(valIndex, 1);
    setOptions(updated);

    const filtered = variants.filter((v) => !v.title.includes(removed));
    setVariants(filtered);
  };

  const applyBulkToGroup = (group: string) => {
    const price = parseFloat(bulkPrice[group] as string);
    const inventory = parseInt(bulkInventory[group] as string);

    const updated = variants.map((v) =>
      v.group === group ? { ...v, price, inventory } : v
    );
    setVariants(updated);
  };

  const deleteVariant = (index: number) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };

  const groups = Array.from(new Set(variants.map((v) => v.group))) as string[];

  return (
    <div className="variant-editor">
      <h2 className="variant-title">
        🛠️ Configure Variants for <span>{product.title}</span>
      </h2>

      {/* 🧩 Grouped Table should appear ABOVE the Generate Button */}
      {variants.length > 0 && (
        <div className="variant-table-section">
          {groups.map((group) => (
            <details key={group} className="variant-group" open>
              <summary>{group}</summary>

              <div className="bulk-inputs">
                <input
                  type="number"
                  placeholder="Bulk Price"
                  value={bulkPrice[group] || ""}
                  onChange={(e) =>
                    setBulkPrice({ ...bulkPrice, [group]: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Bulk Inventory"
                  value={bulkInventory[group] || ""}
                  onChange={(e) =>
                    setBulkInventory({ ...bulkInventory, [group]: e.target.value })
                  }
                />
                <button onClick={() => applyBulkToGroup(group)}>Apply to all</button>
              </div>

              <table className="variant-table">
                <thead>
                  <tr>
                    <th>Variant</th>
                    <th>Price</th>
                    <th>Inventory</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {variants
                    .filter((v) => v.group === group)
                    .map((v, i) => (
                      <tr key={i}>
                        <td>{v.title}</td>
                        <td>
                          <input
                            type="number"
                            value={v.price}
                            onChange={(e) =>
                              updateVariant(i, "price", parseFloat(e.target.value))
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={v.inventory}
                            onChange={(e) =>
                              updateVariant(i, "inventory", parseInt(e.target.value))
                            }
                          />
                        </td>
                        <td>
                          <button className="delete-btn" onClick={() => deleteVariant(i)}>
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </details>
          ))}
        </div>
      )}

      {/* 🧩 Options Section */}
      <div className="option-section">
        {options.map((opt, i) => (
          <div key={i} className="option-block">
            <label>{opt.name}</label>
            <div className="option-values">
              {opt.values.map((val, j) => (
                <div key={j} className="option-value">
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => {
                      const updated = [...options];
                      updated[i].values[j] = e.target.value;
                      setOptions(updated);
                    }}
                  />
                  <button className="delete-btn" onClick={() => deleteOptionValue(i, j)}>
                    ✕
                  </button>
                </div>
              ))}
              <button
                className="add-btn"
                onClick={() => {
                  const updated = [...options];
                  updated[i].values.push("");
                  setOptions(updated);
                }}
              >
                ➕ Add Value
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🧩 Generate Button Now Comes After the Table */}
      <button className="generate-btn" onClick={generateVariants}>
        Generate Variants
      </button>
    </div>
  );
}
