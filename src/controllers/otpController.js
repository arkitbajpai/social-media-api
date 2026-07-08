import Otp from "../models/Otp.js";
import User from "../models/User.js";
import transporter from "../utils/sendMail.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcryptjs";

export const sendOtp = async(req,res)=>{

try{

const { email } = req.body;

const user = await User.findOne({ email });

if(!user){

return res.status(404).json({
success:false,
message:"User not found"
});

}

const otp = otpGenerator.generate(6,{
upperCaseAlphabets:false,
specialChars:false,
lowerCaseAlphabets:false
});

await Otp.deleteMany({ email });

await Otp.create({

email,
otp,

expiresAt:
new Date(Date.now()+5*60*1000)

});

await transporter.sendMail({

from:process.env.EMAIL,

to:email,

subject:"Password Reset OTP",

text:`Your OTP is ${otp}`

});

return res.status(200).json({

success:true,
message:"OTP sent"

});

}
catch(error){

return res.status(500).json({
success:false,
message:error.message
});

}

};
export const verifyOtp = async(req,res)=>{

try{

const { email, otp } = req.body;

const otpRecord =
await Otp.findOne({ email, otp });

if(!otpRecord){

return res.status(400).json({

success:false,
message:"Invalid OTP"

});

}

if(otpRecord.expiresAt < new Date()){

return res.status(400).json({

success:false,
message:"OTP Expired"

});

}

return res.status(200).json({

success:true,
message:"OTP Verified"

});

}
catch(error){

return res.status(500).json({

success:false,
message:error.message

});

}

};
export const resetPassword = async(req,res)=>{

try{

const {

email,
otp,
password

}=req.body;

const otpRecord=
await Otp.findOne({
email,
otp
});

if(!otpRecord){

return res.status(400).json({

success:false,
message:"Invalid OTP"

});

}

const hashedPassword=
await bcrypt.hash(
password,
10
);

await User.findOneAndUpdate(

{ email },

{
password:hashedPassword
}

);

await Otp.deleteMany({
email
});

return res.status(200).json({

success:true,
message:"Password updated"

});

}
catch(error){

return res.status(500).json({

success:false,
message:error.message

});

}

};