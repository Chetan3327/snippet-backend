import mongoose from "mongoose";

const SnippetSchema = new mongoose.Schema({
    title: {type: String, required: true},
    codeString: {type: String, required: true},
    language: {type: String, required: true},
    sectionId: {type: mongoose.Types.ObjectId, required: true, ref: 'sections'}
}, { timestamps: true })

const SnippetModel = mongoose.model('snippets', SnippetSchema)
export default SnippetModel