import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../features/blogs/blogSlice';
import contactReducer from '../features/contact/contactSlice';
import productReducer from '../features/products/productSlice';
import  authReducer  from '../features/user/userSlice';
//import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    auth:authReducer,
    product:productReducer,
    blog:blogReducer,
    contact:contactReducer
  },
});
