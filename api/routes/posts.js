const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const { route } = require('./users');
// create post
router.post('/create',async (req,res)=>{
    try{
        const newPost = await new Post(req.body);
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    }catch(error){
        res.status(500).json(error);
    }
})

// update post
router.put('/:id',async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body});
            res.status(200).json("The post has been updated.");
        }else{
            res.status(403).json("You can update only your post.");
        }
    }catch(error){
        res.status(500).json(error);
    }
})
// delete post
router.delete('/:id',async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.delete();
            res.status(200).json("The post has been deleted.");
        }else{
            res.status(403).json("You can delete only your post.");
        }
    }catch(error){
        res.status(500).json(error);
    }
})
// like post
router.put('/:id/like',async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId))
        {
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("Post has been liked");
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json("Post has been disliked");
        }
    }catch(error){
        res.status(500).json(error);
    }
})
// get a post
router.get("/:id",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(error){
        res.status(500).json(error);
    }
})
// get timeline post
router.get('/timeline/all', async (req,res)=>{
    let postArray = [];
    try{
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => (
                Post.find({userId: friendId})
            ))
        )
        res.status(200).json(userPosts.concat(...friendPosts));
    }catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;