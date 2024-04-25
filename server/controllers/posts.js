import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import express from 'express';
import sharp from 'sharp'; 

const router = express.Router();



export const getPosts = async (req, res) => {
    let { page } = req.query;
  
    if (page === undefined || isNaN(Number(page))) {
      page = 1;
    }
  
    try {
      const LIMIT = 9;
      const startIndex = (Number(page) - 1) * LIMIT;
      const total = await PostMessage.countDocuments({});
      const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
  
      res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  

export const getPostsSearch = async (req,res) => {
    const { searchQuery, tags} = req.query
    try {
        const title = new RegExp(searchQuery, 'i');
        // const tags = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({ $or: [ { title }, {tags: { $in: tags.split(',')}}]});
        res.json({ data: posts});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getPost = async (req,res) => {
    const {id} = req.params;
   try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);

   } catch (error) {
    res.status(404).json({message: error.message});

   }
}

// export const createPost = async (req, res) => {
//     const post = req.body;
//     const newPost = new PostMessage({ ... post, creator: req.userId, createdAt: new Date().toISOString()});
// try {
//     await newPost.save();
//     res.status(200).json(newPost);
// } catch (error) {
//    console.log(error);
// }
// }



export const createPost = async (req, res) => {
    const { title, message, tags, selectedFile } = req.body;
    let newPost;

    try {
        if (image) {
            const webpBuffer = await sharp(image.buffer).toFormat('webp').toBuffer();
            newPost = new PostMessage({ title, message, tags, selectedFile: { buffer: webpBuffer, contentType: 'image/webp' }, creator: req.userId, createdAt: new Date().toISOString() });
        } else {
            newPost = new PostMessage({ title, message, creator: req.userId, createdAt: new Date().toISOString() });
        }

        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create post" });
    }
};




export const updatePost = async(req, res) => {
    const {id: _id} = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Here is not a valid id');
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true});
    res.json(updatedPost);
}

export const deletePost = async(req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Here is not a valid id');

    await PostMessage.findByIdAndRemove(id);
 
    res.json({message: 'Post deleted successfully'});


}

export const likePost = async(req, res) => {
    const { id } = req.params;
    if(!req.userId) return res.json({message: 'Unauthorized && Unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Here is not a valid id');

    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if(index === -1){
        post.likes.push(req.userId);
    }else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true});
    res.json(updatedPost);
}

export const commentPost = async(req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
    res.json(updatedPost);
}


export default router;
