const {Router} = require('express');
const user = require("../models/user")

const router = Router();

router.get("/signup",(req,res)=>{
    return res.render("signup");
});

router.get("/signin",(req,res)=>{
    return res.render("signin");
})

router.post("/signup",async (req,res)=>{
    try{
        console.log(req.body);
        const {fullName,email,password} = req.body;
    await user.create({
        fullName,
        email,
        password
    })
    return res.redirect('/');
    }catch(error){
        console.log(error);
        res.render("signup",{error:"Email already Exists"});

    }
})

router.post("/signin",async (req,res)=>{
    const {email,password}=req.body;
    const isMatched=await user.matchPassword(email,password);
    console.log("user",user);
    return res.redirect("/");
})

module.exports = router;
