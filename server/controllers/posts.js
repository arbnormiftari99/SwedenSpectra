import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import express from 'express';
import cloudinary from "../middleware/config.cloudinary.js";
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


export const createPost = async (req, res) => {
    const { title, message, tags, selectedFile, name } = req.body;

    try {
        // Create the post in the database
        const newPost = new PostMessage({
            title,
            message,
            tags,
            creator: req.userId,
            createdAt: new Date().toISOString(),
            name
        });

        // Save the post to get its ID
        await newPost.save();

        let uploadedFiles = [];

        // If selectedFile is an array, upload each file separately
        if (Array.isArray(selectedFile)) {
            uploadedFiles = await Promise.all(selectedFile.map(async (file) => {
                const result = await cloudinary.uploader.upload(file, {
                    folder: "swedenSpectraImages",
                });
                return { public_id: result.public_id, url: result.secure_url };
            }));
        } else {
            // If selectedFile is a single file, upload it
            const result = await cloudinary.uploader.upload(selectedFile, {
                folder: "swedenSpectraImages",
            });
            uploadedFiles.push({ public_id: result.public_id, url: result.secure_url });
        }

        // Update the post with uploaded image(s)
        newPost.selectedFile = uploadedFiles;

        // Save the post again to update the selectedFile field
        await newPost.save();

        res.status(200).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
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

    try {
        const post = await PostMessage.findById(id);

        if (post.selectedFile && post.selectedFile.length > 0) {
            await Promise.all(post.selectedFile.map(async (file) => {
                await cloudinary.uploader.destroy(file.public_id);
            }));
        }

        await PostMessage.findByIdAndRemove(id);

        res.json({message: 'Post deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
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
