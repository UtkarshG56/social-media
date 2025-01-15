const router = require("express").Router()
const { json } = require("express")
const User = require("../models/User")
const bcrypt = require("bcrypt")

// updating user
router.put("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin)
    {
        if(req.body.password)
        {
            try{
                const salt = await bcrypt.hash(req.boddy.password,salt)
            }catch(err){
                return res.status(500).json(err)
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body,})
            res.status(200).json("Account has been updated")
        }catch(err)
        {
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).json("you can update only ypur account!")
    }
})

// Deleting user
router.delete("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin)
    {
       
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account has been deleted")
        }catch(err)
        {
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).json("you can delete only ypur account!")
    }
})

// getting a user
router.get("/:id",async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password,updatedAt, ...other} = user._doc
        res.status(200).json(other)
    }catch(err)
    {
        res.status(500),json(err)
    }
})

// following a user
router.put("/:id/follow",async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const curruser = await User.findById(req.body.userId)
            if(! user.followers.includes(req.body.userId))
            {
                await user.updateOne({ $push:{followers:req.body.userId}})
                await curruser.updateOne({ $push:{following:req.params.id}})
                res.status(200).json("user has been followed")
            }
            else{
                res.status(401).json("you already follow this user")
            }
        }catch(err)
        {
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("you can not follow yourself")
    }
})

// unfollowing a user
router.put("/:id/unfollow",async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const curruser = await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId))
            {
                await user.updateOne({ $pull:{followers:req.body.userId}})
                await curruser.updateOne({ $pull:{following:req.params.id}})
                res.status(200).json("user has been followed")
            }
            else{
                res.status(401).json("user unfollowed")
            }
        }catch(err)
        {
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("you can not unfollow yourself")
    }
})

// getting all registered 
router.get("/",async(req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router