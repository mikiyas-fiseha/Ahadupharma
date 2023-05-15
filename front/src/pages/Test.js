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
import React from 'react';
import ImageMagnify from 'react-image-magnify';

const Test = () => {
  const smallImage =    "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
  ;
  const largeImage =    "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
  ;

  return (
    <div className="row">
      <div className="col">
        <ImageMagnify
          {...{
            smallImage: {
              alt: 'Small Image',
              src: smallImage,
              width: 400, // Adjust the width of the small image as needed
              height: 300, // Adjust the height of the small image as needed
            },
            largeImage: {
              src: largeImage,
              width: 1200, // Adjust the width of the large image as needed
              height: 900, // Adjust the height of the large image as needed
            },
            enlargedImageContainerStyle: {
              background: '#fff',
              boxShadow: '0 0 5px rgba(0,0,0,.3)',
              position: 'absolute',
              right: 0,
              zIndex: 9999,
            },
          }}
        />
      </div>
    </div>
  );
};
export default Test;
