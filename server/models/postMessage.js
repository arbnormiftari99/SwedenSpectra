import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
   likes: {
        type: [String],
        default: [],
    },
    comments: {type: [String], default: []},
    createdAt: {
        type: Date,
        default: Date.now
    },
});

let PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;