const bodyParser = require("body-parser");
const express=require("express");
const dbconnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app=express();
const dotenv=require("dotenv").config()
const authRoute=require("./routes/authRoute")
const blogRoute=require("./routes/blogRoute")
const categoryRoute=require("./routes/prodcategoryRoute")
const subcategoryRoute=require("./routes/subcategoryRoute")

const productRoute=require("./routes/productRoute")
const blogcategoryRouter=require("./routes/blogCatRoute")
const colorRouter = require("./routes/colorRoute");
const brandRouter = require("./routes/brandRoute");
const couponRouter = require("./routes/couponRoute");
const uploadRouter = require("./routes/uploadRouthe");
const enqRouter = require("./routes/enqRoute");
const PORT=process.env.PORT||4000
const cookieParser=require("cookie-parser")
const morgan=require("morgan")
var cors = require('cors')
dbconnect();

 
app.use(cors())
app.use(morgan("dev"))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(cookieParser())
app.use("/api/user",authRoute)
app.use("/api/product",productRoute)
app.use("/api/blog",blogRoute)
app.use("/api/category",categoryRoute)
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon",couponRouter)
app.use("/api/upload",uploadRouter)
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/subcategory",subcategoryRoute)



app.use(notFound)
app.use(errorHandler)
app.listen(5000,()=>{
    console.log(`app is listening  at  port ${PORT}  `)
})