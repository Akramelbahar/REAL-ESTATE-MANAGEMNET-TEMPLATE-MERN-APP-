import mongoose, { mongo } from "mongoose";
const SeenSchema = new mongoose.Schema({
    ad: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Advertisment"
    }],
    ip: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Seen = mongoose.model("Seen", SeenSchema);

export default Seen ; 