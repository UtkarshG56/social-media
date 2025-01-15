const router = require("express").Router()
const bcrypt = require('bcrypt')

const User = require("../models/User")


router.post("/register", async (req,res)=>{
   
    
    try{
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(req.body.password,salt)
        const user = new User({
            Username : req.body.Username,
            email : req.body.email,
            password : hashPass
        })
        const usr = await user.save()
        res.status(200).json(usr)
    }catch(err){
        res.status(500).json(err)
    }
    
})

// user login

router.post("/login", async (req,res)=>{
    try{
        const e = req.body.email
        const login_user = await User.findOne({email : e})
        !login_user && res.status(404).json("user not found")
   
        const Pass = await bcrypt.compare(req.body.password,login_user.password)
        !Pass && res.status(400).json("wrong password")

        res.status(200).json(login_user)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router