import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const voteSchema = new mongoose.Schema({
    // thumbnail: {
    //     type: String, // Cloudinary path
    //     required: true,
    // },
    // title: {
    //     type: String,
    //     required: true,
    // },
    // duration: {
    //     type: Number,
    //     required: true,
    // },
    // description: {
    //     type: String,
    //     required: true,
    // },
    // views: {
    //     type: Number,
    //     default: 0
    // },
    // isPublished: {
    //     type: Boolean,
    //     default: true
    // },
    givenby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    givento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contestant",
    }
}, {
    timestamps: true
})

voteSchema.plugin(mongooseAggregatePaginate); // Used to add meta data like
// total documents matching query etc. 

export const Vote = mongoose.model("Vote", voteSchema);
