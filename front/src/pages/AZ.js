import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import { getAllProducts } from '../features/products/productSlice';
const AZ = () => {
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
                <h5 className='cursorpointer' onClick={() => redirectToProduct(product._id)}>{product.title}</h5>
                
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default AZ;