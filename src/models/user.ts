import mongoose from "mongoose";
export type UserModel = mongoose.Document & {
  email: string;
  password: string;
  name: string;
  tokens: Object;
  role: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  occupation: string;
  phoneNumber: Object; // { dialCode: string , number : string }
  identityCardNumber: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
};

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    tokens: Object,
    role: { type: String, default: "USER" },
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    occupation: String,
    phoneNumber: Object, // { dialCode: string , number : string }
    identityCardNumber: String,
    address: String,
    zipCode: String,
    city: String,
    country: String
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: (doc: any, ret: any, opt: any) => {
    delete ret["password"];
    return ret;
  }
});

const User = mongoose.model("User", userSchema);
export default User;
