import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    gender: {
      type: String
    },

    avatar: {
      type: String,
      default: ""
    },

    tokens: [
      {
        token: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
);


userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(
    this.password,
    10
  );

  next();

});


userSchema.methods.comparePassword =
async function(password){

return await bcrypt.compare(
password,
this.password
)

};


const User = mongoose.model(
  "User",
  userSchema
);

export default User;