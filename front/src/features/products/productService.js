import axios from "axios";
import { base_url } from "../../utils/baseUrl";

import { config } from "../../utils/axiosconfig";

const getProducts=async(data)=>{
    console.log(data,'filter');
    const respons=await axios.get(`${base_url}product?${data?.brand?`brand=${data?.brand}&&`:""}${data?.tag?`tags=${data?.tag}&&`:""}${data?.category?`category=${data?.category}&&`:""}${data?.minprice?`price[gte]=${data?.minprice}&&`:""}${data?.maxprice?`price[lte]=${data?.maxprice}&&`:""}${data?.sort?`sort=${data?.sort}&&`:""}`)
    if(respons.data){
        return respons.data
    }
   
}
const getSingleProduct=async(id)=>{
    const respons=await axios.get(`${base_url}product/${id}`)
    if(respons.data){
        return respons.data
    }
   
}

const addTOWishlist=async(prodId)=>{
    console.log(prodId,"prodIdser")

    const respons=await axios.put(`${base_url}product/wishlist`,{prodId},config)
    
    if(respons.data){
        
        return respons.data
    }
   
}

const rateProduct=async(data)=>{
    console.log(data,"prodIdser")

    const respons=await axios.put(`${base_url}product/rating`,data,config)
    
    if(respons.data){
        
        return respons.data
    }
   
}


const productService = {
    
    getProducts,
    addTOWishlist,
    getSingleProduct,
    rateProduct
  };
  
  export default productService;