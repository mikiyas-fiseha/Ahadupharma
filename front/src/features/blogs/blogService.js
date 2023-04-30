import axios from "axios";
import { base_url } from "../../utils/baseUrl";

import { config } from "../../utils/axiosconfig";

const getBlogs=async()=>{
    const respons=await axios.get(`${base_url}blog`)
   // console.log(respons.data,"respons.data")
    if(respons.data){
        return respons.data
    }
   
}
const getBlog=async(id)=>{
    const respons=await axios.get(`${base_url}blog/${id}`)
   // console.log(respons.data,"respons.data")
    if(respons.data){
        return respons.data
    }
   
}






const blogService = {
    
    getBlogs,
    getBlog
  };
  
  export default blogService;