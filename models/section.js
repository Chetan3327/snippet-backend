import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    snippets: [{type: mongoose.Types.ObjectId, ref: 'snippets'}]
}, { timestamps: true })

const SectionModel = mongoose.model('sections', SectionSchema)
export default SectionModel
