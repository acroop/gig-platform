import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hobby:{
        type:String,
        required:true
    },
    q1: {
        type: String,
        required: true
    },
    q2: {
        type: String,
        required: true
    },
    q3: {
        type: String,
        required: true
    },
    q4: {
        type: String,
        required: true
    },
    q5: {
        type: String,
        required: true
    },

})

export const User = mongoose.models.User || mongoose.model("User", userSchema);

