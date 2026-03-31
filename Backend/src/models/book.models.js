import mongoose, {Schema} from "mongoose";

const bookSchema = new Schema({
    name: String,
    title: Number,
    category: String,
    image: String
} ,{
    timestamps: true
})

export const Book = mongoose.model("Book",bookSchema)