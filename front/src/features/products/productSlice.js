import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import productService from "./productService";




    export const getAllProducts=createAsyncThunk(
      "product/get" ,
      async(data,thunkAPI)=>{
          try {
              return await productService.getProducts(data)
          } catch (error) {
        return thunkAPI.rejectWithValue(error);
              
          }
      })

      export const getAProduct=createAsyncThunk(
        "product/singleget" ,
        async(id,thunkAPI)=>{
            try {
                return await productService.getSingleProduct(id)
            } catch (error) {
          return thunkAPI.rejectWithValue(error);
                
            }
        })
  
      export const addTOWishlist=createAsyncThunk(
        "product/wishglist" ,
        async(prodID,thunkAPI)=>{
            try {
              console.log(prodID,"prodID")
                return await productService.addTOWishlist(prodID)
            } catch (error) {
          return thunkAPI.rejectWithValue(error);
                
            }
        })
        export const addRating=createAsyncThunk(
          "product/rating" ,
          async(data,thunkAPI)=>{
              try {
                console.log(data,"data")
                  return await productService.rateProduct(data)
              } catch (error) {
            return thunkAPI.rejectWithValue(error);
                  
              }
          })
      const productState = {
        product: "",
        isError: false,
        isLoading: false,
        isSuccess: false,
        message: "",
      };
export const productSlice = createSlice({
    name: "product",
    initialState: productState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        state.product= action.payload;
      
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
       
      }).addCase(addTOWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTOWishlist.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist= action.payload;
        state.message = "product added to wishlist";
        // if(state.isSuccess){
        //   toast.success("Product Added To Wishlist")
        // }

      
      })
      .addCase(addTOWishlist.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        if(state.isError===true){
          toast.error(action.payload.response.data.message)
        }
       
      }).addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.singleproduct= action.payload;
        state.message = "singleproduct success";

      
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
       
      }).addCase(addRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.rating= action.payload;
        state.message = "Rating added success";
        if(state.isSuccess){
          toast.success("Rating Added Successfully")
        }

      
      })
      .addCase(addRating.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
       
      })
    
    }
    
    
    })

export default productSlice.reducer;
