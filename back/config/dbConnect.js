const {  default: mongoose } = require("mongoose")

const dbconnect=()=>{
try {
    
mongoose.set("strictQuery", false);
    const conn=mongoose.connect(process.env.MONGODB_URL)
    console.log("database connected  successfully")
} catch (error) {
    console.log(error)
}
}

module.exports=dbconnect