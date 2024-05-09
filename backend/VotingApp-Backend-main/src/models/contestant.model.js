import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const contestantSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,        
        index: true// For seamless searching
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    party: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    votecount:{
        type: Number,
        required: true,
        index: true
    },
    avatar: {
        type: String,// Cloudinary url to be stored
        required: true,
    },
}, {
    timestamps: true
})

contestantSchema.plugin(mongooseAggregatePaginate);
export const Contestant = mongoose.model("Contestant", contestantSchema)