
const userLogic = require('../BL/userLogic');
const express=require('express');
const router = express.Router();
const { authJWT } = require("../middleware/auth")


router.post('/login', async (req, res) => {
    try {
      const token = await userLogic.login(req.body);
      res.send(token)
    }
    catch (err) {
      res.send(err)
    }
  })

router.post('/register', async(req,res) => {
    try{
        const newUser=await userLogic.register(req.body);
        console.log(newUser, "new user");
        res.send(newUser);
    }catch(error){
        console.log(error.message);
        res.status(error.code||500).send(error.message||"sorry, something went wrong");
    }
})


router.get('/', async (req, res) => {
    // console.log("bla");
    // console.log(req.query.id);
    try{
    // const users=await userLogic.getUserDetailsById(req.query.id);
    const users=await userLogic.getAllUsers();
     res.send(users);
    } catch(error){
        console.log(error.message);
        res.status(500).send("sorry something went wrong");
    }
    // user= await  userLogic.getUserDetailsById(req.params.id);
   /// res.send(user);
 })

// router.get('/:id', async (req, res) => {
//    const user= await  userLogic.getUserDetailsById(req.params.id);
//    res.send(user);
// })

router.get('/:id', async (req, res) => {
    try{
    const user= await  userLogic.getUserDetailsById(req.params.id);
    res.send(user);
    }catch(error){
        console.log(error.code);
     console.log(error.message);
     res.status(error.code|| 500).send(error.message);  
    }
 })

//  router.delete("/edit_user/:id", async (req, res)=>{
//     userLogic.del(req.params.id);
// console.log(req.body);
// res.send("blalal") //on le voit ds postman en bas, c ce qu'il renvoie
// })


 router.put("/:id", async (req, res)=>{
try{
    
   const user=await userLogic.updateUser(req.params.id, req.body);
   console.log("user: "+user);
   if(!user){
    console.log("user not found")
   }
   
    console.log(req.body); //ex: {lastName:gut}
res.send(user) //on le voit ds postman en bas, c ce qu'il renvoie
}catch(error){
console.log(error.message);
res.status(error.code|| 500).send("error");
 }
})


    router.delete('/:id', async (req, res) => {//R validations
        try{
        const user= await  userLogic.del(req.params.id);
        res.send(user);
        }catch(error){
            console.log(error.code);
         console.log(error.message);
         res.status(error.code|| 500).send(error.message);  
        }
     })


module.exports=router;
