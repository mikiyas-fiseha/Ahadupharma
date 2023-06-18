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


// import React from 'react';
// import ImageMagnify from 'react-image-magnify';

// const Test = () => {
//   const smallImage =    "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
//   ;
//   const largeImage =    "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
//   ;

//   return (
//     <div className="row">
//       <div className="col">
//         <ImageMagnify
//           {...{
//             smallImage: {
//               alt: 'Small Image',
//               src: smallImage,
//               width: 400, // Adjust the width of the small image as needed
//               height: 300, // Adjust the height of the small image as needed
//             },
//             largeImage: {
//               src: largeImage,
//               width: 1200, // Adjust the width of the large image as needed
//               height: 900, // Adjust the height of the large image as needed
//             },
//             enlargedImageContainerStyle: {
//               background: '#fff',
//               boxShadow: '0 0 5px rgba(0,0,0,.3)',
//               position: 'absolute',
//               right: 0,
//               zIndex: 9999,
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };
// export default Test;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import { getAllProducts } from '../features/products/productSlice';
const Test = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const productState = useSelector((state) => state?.product?.product);
  console.log(productState);
  const [brands,setBrand]=useState([])
  const [categories,setCategories]=useState([])
  const [tags,setTages]=useState([])

  //filter state
  const [category,setCategory]=useState(null)
  const [tag,setTag]=useState(null)
  const [brand,setBrands]=useState(null)
  const [minprice,setMinPrice]=useState(null)
  const [maxprice,setMaxPrice]=useState(null)
  const [sort,setSort]=useState(null)



  //  console.log(sort)
useEffect(()=>{
  let newbrand=[]
  let category=[]
  let newtags=[]

  for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newbrand.push(element.brand)
      category.push(element.category)
      newtags.push(element.tags)
  }
  setBrand(newbrand)
  setCategories(category)
  setTages(newtags)
},[productState])
// console.log([...new Set (brands)],[...new Set (categories)],[...new Set(tags)]);
useEffect(()=>{
  getProducts()
},[sort,tag,brand,category,minprice,maxprice])
  const getProducts=()=>{
      dispatch(getAllProducts({sort,tag,brand,category,minprice,maxprice}))
  }

 
  const redirectToProduct = (productId) => {
    window.location.href = `/product/${productId}`;
  };
  const groupProductsByLetter = () => {
    const groupedProducts = {};

    productState&&productState?.forEach((product) => {
      const firstLetter = product?.title?.charAt(0).toUpperCase();
      if (!groupedProducts[firstLetter]) {
        groupedProducts[firstLetter] = [];
      }
      groupedProducts[firstLetter]?.push(product);
    });

    // Sort the letters in alphabetical order
    const sortedLetters = Object.keys(groupedProducts).sort();

    // Create a new object with sorted letters and their corresponding products
    const sortedGroupedProducts = {};
    sortedLetters.forEach((letter) => {
      sortedGroupedProducts[letter] = groupedProducts[letter];
    });

    return sortedGroupedProducts;
  };

  const groupedProducts = groupProductsByLetter();

  return (
    <div className="d-flex flex-wrap p-5">
      {Object.entries(groupedProducts)
        .slice(0, 26) // Display only the first two entries (letters)
        .map(([letter, products]) => (
          <div key={letter} className="col-md-6 mb-4 ">
            <h3 className='p-3'>{letter}</h3>
            {products.map((product) => (
              <div
                key={product.id}
               
                className="p-3"
                // style={{ backgroundColor: 'gray' }}
              >
                <h5  onClick={() => redirectToProduct(product._id)}>{product.title}</h5>
                
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Test;



// <header className="header-upper py-3">
//         <div className="container-xxl">
//           <div className="row align-items-center">
//             <div className="col-2">
//               <h2>
//                 <Link className="text-white">Ahadu</Link>
//               </h2>
//             </div>
//             <div className="col-5">
//               <div className="input-group">
//               <Typeahead
//         id="pagination-example"
//         onPaginate={() => console.log('Results paginated')}
//         onChange={(selected)=>{
//           navigate(`/product/${selected[0]?.prod}`)
//           dispatch(getAProduct(selected[0]?.prod))
//         }}
//         options={productOtp}
//         paginate={paginate}
//         minLength={1}//same caracter
//         labelKey={"name"}
//         placeholder="Search product here..."
//       />
//                 <span className="input-group-text p-3" id="basic-addon2">
//                   <BsSearch className="fs-6" />
//                 </span>
//               </div>
//             </div>
//             <div className="col-5">
//               <div className="header-upper-links d-flex align-items-center justify-content-between">
//                 <div>
//                   <Link
//                     to="/compare-product"
//                     className="d-flex align-items-center gap-10 text-white"
//                   >
//                     <img src={compare} alt="compare" />
//                     <p className="mb-0">
//                       Compare <br /> Products
//                     </p>
//                   </Link>
//                 </div>
//                 <div>
//                   <Link
//                     to="/wishlist"
//                     className="d-flex align-items-center gap-10 text-white"
//                   >
//                     <img src={wishlist} alt="wishlist" />
//                     <p className="mb-0">
//                       Favourite <br /> wishlist
//                     </p>
//                   </Link>
//                 </div>
//                 <div>
//                   <Link
//                     to={authState.user===null? "/login":"/user-info"}
//                     className="d-flex align-items-center gap-10 text-white"
//                   >
//                     <img src={user} alt="user" />
//                    {
//                     authState.user===null? <p className="mb-0">
//                     Log in <br /> My Account
//                   </p>: <p className="mb-0">
//                       Welcome<br/>{authState?.user?.firstname}
//                     </p>
//                    }
//                   </Link>
//                 </div>
//                 <div>
//                   <Link
//                     to="/cart"
//                     className="d-flex align-items-center gap-10 text-white"
//                   >
//                     <img src={cart} alt="cart" />
//                     <div className="d-flex flex-column gap-10">
//                       <span className="badge bg-white text-dark">{CartState?.length ?CartState?.length:0}</span>
//                       <p className="mb-0">$ {total ?total:0}</p>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
      // </header>