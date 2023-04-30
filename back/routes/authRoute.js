const express=require("express")
const { checkout, paymentVerification } = require("../controller/paymentCtrl")
const { 
creatUser, 
loginUserCtr, 
getallUser, 
getaUser, 
deleteaUser, 
updateaUser, 
blockUser,
unblockUser,
handleRefreshToken, 
logOut, 
updatePassword, 
forgotPasswordToken,
resetPassword,
loginAdmin,
getWishlist,
saveAddress,
userCart,
getUserCart,
// emptyCart,
// applyCoupon,
 createOrder,
// getOrders,
// getAllOrders,
// updateOrderStatus,
removeProductFromCart,
updateProductQuantityFromCart,
getMyOrders,
getMonthWiseOrderIncome,
getMonthWiseOrderCount,
getYearlyTotalOrder,
getAllOrders} = require("../controller/userCtrl")
const { 
authMiddleware, 
isAdmin } = require("../middlewares/authMiddleware")
const router=express.Router()

router.post("/register",creatUser)
router.post("/login",loginUserCtr)
router.post("/admin-login",loginAdmin)
router.post("/cart",authMiddleware,userCart)
router.get("/cart", authMiddleware, getUserCart);

router.post("/order/checkout",authMiddleware,checkout)
router.post("/order/paymentVerification",authMiddleware,paymentVerification)

// router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/creat-order", authMiddleware, createOrder);
// router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/delete-product-cart/:cartItemId", authMiddleware, removeProductFromCart);
router.delete("/update-product-cart/:cartItemId/:newquantity", authMiddleware, updateProductQuantityFromCart);
router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncome);
router.get("/getMonthWiseOrderCount", authMiddleware, getMonthWiseOrderCount);
router.get("/getYearlyTotalOrder", authMiddleware, getYearlyTotalOrder);



router.post("/forgot-password-token", forgotPasswordToken);

router.put("/reset-password/:token", resetPassword);
router.get("/logout",logOut)
router.get("/wishlist",authMiddleware,getWishlist)

router.get("/all-users",getallUser)
router.get("/getmyorders", authMiddleware, getMyOrders);
// router.get("/get-orders", authMiddleware, getOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
// router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getAllOrders);

router.get("/refresh",handleRefreshToken)
router.get("/:id",authMiddleware,isAdmin,getaUser)
router.delete("/:id",deleteaUser)
router.put("/edit-user",authMiddleware,updateaUser)
router.put("/save-address",authMiddleware,saveAddress)
// router.put(
//     "/order/update-order/:id",
//     authMiddleware,
//     isAdmin,
//     updateOrderStatus
//   );
router.put("/password",authMiddleware,updatePassword)
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
module.exports=router 