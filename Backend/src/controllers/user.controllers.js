import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErrors.js";
import {ApiResponse} from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken,refreshToken}
    } catch (error) {
        console.log(error)
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(async(req,res) => {
    const {fullName,email,password} = req.body
    console.log("email:",email);

    if([fullName,email,password].some((field) => field ?.trim()==="")){
        throw new ApiError(400,"All fields are required")
    }

    
    const user = await User.create({
        fullName,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully!")
    )
})

const loginUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body
    console.log(email);

    if(!email && !password){
        throw new ApiError(400, "email or password required")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404, "User does not exist")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }

        const { accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true
        }
       return res
       .status(200)
       .cookies("accessToken",accessToken,options)
       .cookies("refreshToken",refreshToken,options)
       .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,accessToken,refreshToken
            },
            "User logged in succesfully"
        )
       )        
})

const loggedoutUser = asyncHandler(async(req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                regreshToken: 1
            }
        },
        {
            new: true
        }
    )
    return res
    .status(200)
    .clearCookies("accessToken",accessToken,options)
    .clearCookies("refreshToken",refreshToken,options)
    .json(new ApiResponse(200, {}, "User looged out"))
})

const refreshAccesaToken = asyncHandler(async(req,res)=>{
          const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

          if(!incomingRefreshToken){
            throw new ApiError(401,"unauthorized request")
          }
          try {
            const decodedToken = jwt.verify(
                incomingRefreshToken,
                process.env.REFRESH_TOKEN_SECRET
            )

            const user = await User.findById(decodedToken?._id)

            if(!user){
                throw new ApiError(401,"Invalid refresh token")
            }

            if(!incomingRefreshToken !== user?.refreshToken){
                throw new ApiError(401,"Refresh token is expired or used")
            }

            const options ={
                httpOnly: true,
                secure: true
            }

            const {accessToken,newRefreshToken} = await generateAccessAndRefreshTokens(user._id)

            return res
            .status(200)
            .cookies("accessToken",accessToken)
            .cookies("refreshToken",newRefreshToken,options)
            .json(
                new ApiResponse(
                    200,
                    {accessToken,refreshToken: newRefreshToken},
                    "Access token refreshed"
                )
            )
          } catch (error) {
            throw new ApiError(401, error?.message || "Invalid refresh token")
          }
})

export {registerUser,
        loginUser,
        loggedoutUser,
        refreshAccesaToken,}

