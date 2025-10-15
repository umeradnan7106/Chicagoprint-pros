// import { useState } from "react";

// interface OptionBuilderProps {
//   options: { name: string; values: string[] }[];
//   setOptions: (opts: { name: string; values: string[] }[]) => void;
//   setVariants: (variants: any[]) => void;
// }

// export default function OptionBuilder({ options, setOptions, setVariants }: OptionBuilderProps) {
//   const generateVariants = () => {
//     const [sizeOpt, colorOpt] = options;
//     const combos = [];

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

//   return (
//     <div className="option-section">
//       {options.map((opt, i) => (
//         <div key={i} className="option-block">
//           <label>{opt.name}</label>
//           <div className="option-values">
//             {opt.values.map((val, j) => (
//               <div key={j} className="option-value">
//                 <input
//                   type="text"
//                   value={val}
//                   onChange={(e) => {
//                     const updated = [...options];
//                     updated[i].values[j] = e.target.value;
//                     setOptions(updated);
//                   }}
//                 />
//                 <button className="delete-btn" onClick={() => {
//                   const updated = [...options];
//                   updated[i].values.splice(j, 1);
//                   setOptions(updated);
//                 }}>✕</button>
//               </div>
//             ))}
//             <button className="add-btn" onClick={() => {
//               const updated = [...options];
//               updated[i].values.push("");
//               setOptions(updated);
//             }}>➕ Add Value</button>
//           </div>
//         </div>
//       ))}

//       <button className="generate-btn" onClick={generateVariants}>
//         🔄 Generate Variants
//       </button>
//     </div>
//   );
// }
