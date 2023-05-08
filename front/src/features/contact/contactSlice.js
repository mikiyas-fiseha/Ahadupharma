import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import contactService from "./contactService";




    export const createQuery=createAsyncThunk(
      "contact/post" ,
      async(contactData,thunkAPI)=>{
          try {
              return await contactService.postQuery(contactData)
          } catch (error) {
        return thunkAPI.rejectWithValue(error);
              
          }
      })


      const contactState = {
        contact: "",
        isError: false,
        isLoading: false,
        isSuccess: false,
        message: "",
      };
export const contactSlice = createSlice({
    name: "contact",
    initialState: contactState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(createQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuery.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        state.contact= action.payload;
        if(state.isSuccess===true){
          toast.success("Send Successfuly")
        }
      
      })
      .addCase(createQuery.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        if(state.isError===true){
          toast.error(action.payload.response.data.message)
        }
       
      })
    }
    
    
    })

export default contactSlice.reducer;
