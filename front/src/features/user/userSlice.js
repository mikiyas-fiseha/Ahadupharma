import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./userService";
import { toast } from 'react-toastify';

const getUserfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
const initialState = {
    user: getUserfromLocalStorage,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };
 export const registerUser=createAsyncThunk(
    "auth/register" ,
    async(userData,thunkAPI)=>{
        try {
            return await authService.register(userData)
        } catch (error) {
      return thunkAPI.rejectWithValue(error);
            
        }
    })

    export const loginUser=createAsyncThunk(
      "auth/login" ,
      async(userData,thunkAPI)=>{
          try {
              return await authService.login(userData)
          } catch (error) {
        return thunkAPI.rejectWithValue(error);
              
          }
      })
      export const getUserProductWishlist=createAsyncThunk(
        "user/wishlist" ,
        async(thunkAPI)=>{
            try {
                return await authService.getUserWishlist()
            } catch (error) {
          return thunkAPI.rejectWithValue(error);
                
            }
        })
        export const addProdTOCart=createAsyncThunk(
          "user/cart" ,
          async(cartData,thunkAPI)=>{
              try {
                  return await authService.addToCart(cartData)
              } catch (error) {
            return thunkAPI.rejectWithValue(error);
                  
              }
          })

          export const getUserCart=createAsyncThunk(
            "user/get-cart" ,
            async(data,thunkAPI)=>{
                try {
                    return await authService.getCart(data)
                } catch (error) {
              return thunkAPI.rejectWithValue(error);
                    
                }
            })

            export const getOrders=createAsyncThunk(
              "user/get-order" ,
              async(thunkAPI)=>{
                  try {
                      return await authService.getUserOrder()
                  } catch (error) {
                return thunkAPI.rejectWithValue(error);
                      
                  }
              })
            export const deleteCartProduct=createAsyncThunk(
              "user/delete-cart" ,
              async(cartItemId,thunkAPI)=>{
                  try {
                      return await authService.removeProductFromCart(cartItemId)
                  } catch (error) {
                return thunkAPI.rejectWithValue(error);
                      
                  }
              })

              export const updateCartProduct=createAsyncThunk(
                "user/update-cart" ,
                async(cartDetail,thunkAPI)=>{
                    try {
                        return await authService.updateProductFromCart(cartDetail)
                    } catch (error) {
                  return thunkAPI.rejectWithValue(error);
                        
                    }
                })

                export const updateProfile=createAsyncThunk(
                  "user/update-profile" ,
                  async(data,thunkAPI)=>{
                      try {
                          return await authService.updateUser(data)
                      } catch (error) {
                    return thunkAPI.rejectWithValue(error);
                          
                      }
                  })

                  export const forgotPasswoedToken=createAsyncThunk(
                    "user/forgot-token" ,
                    async(data,thunkAPI)=>{
                        try {
                            return await authService.forgotPassToken(data)
                        } catch (error) {
                      return thunkAPI.rejectWithValue(error);
                            
                        }
                    })

                    export const resetPassword=createAsyncThunk(
                      "user/update-passwoed" ,
                      async(data,thunkAPI)=>{
                              console.log(data);

                          try {
                              return await authService.resetPass(data)
                          } catch (error) {
                        return thunkAPI.rejectWithValue(error);
                              
                          }
                      })
                export const creatAnOrder=createAsyncThunk(
                  "user/creat-order" ,

                  async(orderDetail,thunkAPI)=>{
                    console.log(orderDetail,"order")
                      try {
                          return await authService.createOrder(orderDetail)
                      } catch (error) {
                    return thunkAPI.rejectWithValue(error);
                          
                      }
                  })

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        state.createduser = action.payload;
        if(state.isSuccess===true){
          toast.info("user created Successfuly")
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        if(state.isError===true){
          toast.error(action.payload.response.data.message)
        }
      }).addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        state.user = action.payload;
        if(state.isSuccess===true){
          localStorage.setItem("token",action.payload.token)

         
        }
        // if(state.isSuccess===true){
        //   toast.info("Welcome")
        // }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        if(state.isError===true){
          toast.error(action.payload.response.data.message)
        }
      }).addCase(getUserProductWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        state.gwishlist = action.payload;
      
      })
      .addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
       
      }).addCase(addProdTOCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProdTOCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        state.cartProduct = action.payload;
        if(state.isSuccess===true){
          toast.info("product add to cart Successfuly")
        }
      
      })
      .addCase(addProdTOCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
       
      }).addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        state.cartProducts = action.payload;
      
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
       
      }).addCase(deleteCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        state.deleteCartProduct = action.payload;
        if(state.isSuccess===true){
          toast.info("product Deleted Successfuly")
        }
      
      })
      .addCase(deleteCartProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        if(state.isSuccess===true){
          toast.error("somthing went wrong")
        }
       
      }).addCase(updateCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        state.updatedCartProduct = action.payload;
        if(state.isSuccess===true){
          toast.info("product updated Successfuly")
        }
      
      })
      .addCase(updateCartProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        if(state.isSuccess===true){
          toast.error("somthing went wrong")
        }
       
      }).addCase(creatAnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(creatAnOrder.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        state.orderedProduct = action.payload;
        if(state.isSuccess===true){
          toast.info("Ordered Successfuly")
        }
      
      })
      .addCase(creatAnOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        if(state.isSuccess===true){
          toast.error("somthing went wrong")
        }
       
      }).addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        state.getorderedProduct = action.payload;
      
      
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
       }).addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        state.updatedUser = action.payload;


        if(state.isSuccess===true){
          let currentUserData=JSON.parse(localStorage.getItem('customer'))
          console.log((currentUserData));
          toast.success("Profile update  Successfuly")
          let newUserData={
            _id:currentUserData?._id,
            token:currentUserData?.token,
            firstname:action?.payload?.firstname,
            lasttname:action?.payload?.lasttname,
            email:action?.payload?.email,
            mobile:action?.payload.mobile
          }
          state.user=newUserData;
          localStorage.setItem("customer",JSON.stringify(newUserData))
        }
      
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        if(state.isSuccess===true){
          toast.error("something went wrong")
        }
       }).addCase(forgotPasswoedToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswoedToken.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        state.token = action.payload;
        if(state.isSuccess===true){
          toast.info("email sent  Successfuly")
        }
      
      })
      .addCase(forgotPasswoedToken.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        if(state.isError===true){
          toast.error("something went wrong please try again")
        }
       }).addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        state.pass = action.payload;
        if(state.isSuccess===true){
          toast.info("password updated Successfuly")
        }
      
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        if(state.isError===true){
          toast.error("something went wrong please try again")
        }
       })
    
    
    }
    
    
})



export default authSlice.reducer;
