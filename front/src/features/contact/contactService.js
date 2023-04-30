import axios from "axios";
import { base_url } from "../../utils/baseUrl";

import { config } from "../../utils/axiosconfig";

const postQuery=async(cotactData)=>{
    const respons=await axios.post(`${base_url}enquiry`,cotactData)
    if(respons.data){
        return respons.data
    }
}



const contactService = {
    
    postQuery,
    
};
  
  export default contactService;