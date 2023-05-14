// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Test = () => {
//   const [activeSection, setActiveSection] = useState('description');

//   const toggleSection = (section) => {
//     if (activeSection !== 'description' || section !== 'description') {
//       setActiveSection(section);
//     }
//   };

//   const isSectionActive = (section) => {
//     return activeSection === section;
//   };

//   return (
//     <div className="container">
//       <h2>Product Details</h2>
//       <div className="d-flex">
//         <div
//           className={`section-title ${isSectionActive('description') ? 'active' : ''}`}
//           onClick={() => toggleSection('description')}
//         >
//           Description
//         </div>
//         <div
//           className={`section-title ${isSectionActive('instruction') ? 'active' : ''}`}
//           onClick={() => toggleSection('instruction')}
//         >
//           Instruction
//         </div>
//         <div
//           className={`section-title ${isSectionActive('composition') ? 'active' : ''}`}
//           onClick={() => toggleSection('composition')}
//         >
//           Composition
//         </div>
//       </div>
//       <div className="content">
//         {isSectionActive('description') && <p>This is the product description.</p>}
//         {isSectionActive('instruction') && <p>These are the product usage instructions.</p>}
//         {isSectionActive('composition') && <p>This is the product composition.</p>}
//       </div>
//     </div>
//   );
// };
// export default Test;