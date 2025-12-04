import mongoose from "mongoose";

const urlScheme = new mongoose.Schema(
    {
        urlId:{type: String, required: true},
        originalId:{type:String, required:true},
        shortUrl:{type: String, required:true},
        accessCount:{type: Number, default:0}
    },
    {
        timestamps:true,
    }
);

export default mongoose.model("Url",urlScheme);