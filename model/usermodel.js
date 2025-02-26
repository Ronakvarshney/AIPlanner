import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    verifiedemail: { type: Boolean, required: true },
    picture: { type: String },
    data:  { type : Array }
    ,
    id : {type : String , required : true}
  },
  { timestamps: true }
);

// Ensure the model is created only once
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
