const mongoose = require('mongoose'); // Erase if already required
const bcrypt=require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        
    },
    lasttname:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        default:"user",
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
    },
    
    cart: {
        type: Array,
        default: [],
    },
    address:{
        type:String,
    },
    wishlist:[{type: mongoose.Schema.Types.ObjectId,ref:"Product"}],
    
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},{
    timestamps:true
});
userSchema.pre("save",async function (next){
    if (!this.isModified("password")) {
        next();
      }
    const salt = bcrypt.genSaltSync(10);
   this.password = bcrypt.hashSync(this.password, salt);
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resettoken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
    return resettoken;
  };
  
//Export the model
module.exports = mongoose.model('User', userSchema);