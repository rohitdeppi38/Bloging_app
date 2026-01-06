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
        console.log(req.headersSent);
        return res.render("signup",{error:"Email already Exists"});
        
    }
})

router.post("/signin",async (req,res)=>{
    const {email,password}=req.body;
    try{
        const token=await user.matchPasswordAndGenerateToken(email,password);
        console.log(token);
        return res.cookie("token",token).redirect("/");
    }catch(error){
        return res.render("signin",{
            error:"Incorrect Email or Password",
        });

    }
})

router.get("/logout",(req,res)=>{
    return res.clearCookie("token").redirect("/");
})

module.exports = router;
