
// import React, { useState } from 'react';
// import ImageGallery from 'react-image-gallery';
// import 'react-image-gallery/styles/css/image-gallery.css';
// import Modal from 'react-modal';
// const Test = () => {
//   const images = [
//     {
//         src: 'https://images.unsplash.com/photo-1682687220499-d9c06b872eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
//         thumbnail: 'https://images.unsplash.com/photo-1682687220499-d9c06b872eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
//         originalAlt: 'Image 1',
//         thumbnailAlt: 'Thumbnail 1',
//       },
//       {
//         src: 'https://images.unsplash.com/photo-1683969076131-bdefe093e9cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
//         thumbnail: 'https://images.unsplash.com/photo-1683969076131-bdefe093e9cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
//         originalAlt: 'Image 2',
//         thumbnailAlt: 'Thumbnail 2',
//       },
//       {
//         src: 'https://images.unsplash.com/photo-1683969076131-bdefe093e9cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
//         thumbnail: 'https://images.unsplash.com/photo-1683969076131-bdefe093e9cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
//         originalAlt: 'Image 2',
//         thumbnailAlt: 'Thumbnail 2',
//       },
//     // Add more images as needed
//   ];

 
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState('');

//   const openModal = (src) => {
//     setSelectedImage(src);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   return (
//     <div>
//       <h2>Image Gallery</h2>
//       <div className="row">
//         {images.map((image, index) => (
//           <div key={index} className="col-md-4 mb-3">
//             <img
//               src={image.src}
//               alt={image.alt}
//               className="img-fluid"
//               onClick={() => openModal(image.src)}
//               style={{ borderRadius: '5px' }}
//             />
//           </div>
//         ))}
//       </div>
//       <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
//       <div className="d-flex justify-content-center">
//         <img src={selectedImage} alt="Zoomed Image" className="img-fluid " />
//         </div>
//       </Modal>
//     </div>
//   );
// };
// export default Test;
import React, { useState } from 'react';
import Modal from 'react-modal';

const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: '5px',
      maxWidth: '1000%',
      maxHeight: '100%',
      overflow: 'hidden',
    },
  };
const Test = () => {
  const images = [
    'https://images.unsplash.com/photo-1682687220499-d9c06b872eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1682687220499-d9c06b872eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1682687220499-d9c06b872eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1682687220499-d9c06b872eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
    // Add more images as needed
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (src) => {
    setSelectedImage(src);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="image-gallery">
         <div className="row">
      {images.map((image, index) => (
         <div key={index} className="col-md-4 mb-3">
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className="gallery-image  rounded m-2"
          onClick={() => openImage(image)}
        />
        </div>
      ))}
</div>
      <Modal
        isOpen={!!selectedImage}
        onRequestClose={closeImage}
        style={customModalStyles}
        size="xl"
      >
        <img
          src={selectedImage}
          alt="Zoomed Image"
          className="zoomed-image"
        />
      </Modal>
    </div>
  );
};
export default Test;
