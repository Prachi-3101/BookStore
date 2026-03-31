import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    fullname: {
        type: String,
        requires: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

userSchema.pre("save", async function (){
    if(!this.isModified("password")) return;

    try {
        this.password = await bcrypt.hash(this.password,10);
    } catch (error) {
        throw new Error("Password hashing failed")
    }
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this.id,
        email: this.email,
        fullName: this.fullname
    },process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
})
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this.id,
    },process.env.REFRESH_TOKEN_SECRET),
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
}

export const User = mongoose.model("User",userSchema)