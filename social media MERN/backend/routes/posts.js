const router = require("express").Router()
const Post = require("../models/Post")
const User = require("../models/User")


// creating a post
router.post("/",async (req,res)=>{
    const newpost = new Post(req.body)
    try{
        const savedpost = await newpost.save()
        res.status(200).json(savedpost)
    }catch(err){
        res.status(500).json(err)
    }
})

// update the post
router.put("/:id",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body})
            res.status(200).json("post has been updated")
        }
        else{ 
            res.status(403).json("you can only update your post")
        }
    }catch(err)
    {
        res.status(500).json(err)
    }
})



//  deleting the post
router.post("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


//   liking/disliking  the post 
router.put("/:id/like",async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json("you liked the post")
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("you disliked the post")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//  getting a user post
router.get("/:id",async(req,res)=>{
    try{
        const post = await Post.find({userId : req.params.id})
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})

// getting timeline posts
router.get("/timeline/all/:id", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.id);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followers.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.json(friendPosts)
      // res.json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router