require('../DL/db').connect();
const userController = require('../DL/controllers/userController');
//const {createToken} = require('./jwt');
const jwtFn = require("../middleware/jwt")
const bcrypt=require("bcrypt")

async function getUserDetailsById(id) {//id
    // return await userController.readOne({_id:id});

    const user= await userController.readOne({_id:id});
    console.log(user);
    if(!user)  throw({code:400, message:"This user doesn't exist"});
    return user;
  //  await userController.create({ email: "Yon@walla.com" })
//return 333;
    // find+
    // check if null or exist
    // return error / user {}


}



async function getAllUsers(){
    const users= await userController.read({});
    if(users.length===0)  throw({code:400, message:"there is no users"});
    return users;
    //return userController.read({});
}

// exports.updateUser=async(id, newField)=>{
//     const updatedUser= await userController.update({_id:id, newField});
//     if(!updatedUser)throw({code:400, message:"user not updated"})
//     //await userController.update({_id:id, newField})
// };

async function updateUser(id, newField){//pb of validation...
    const updatedUser= await userController.updateOne({_id:id}, newField);
    console.log("updateUser"+ updatedUser);
   if(!updatedUser){ console.log("vide"); throw({code:400, message:"user not updated"}); }
    // await userController.update({_id:id, newField})
    return updatedUser;
};


// create(user1)
// exports.getAllUsers=()=>{
//     return userController.read({});
// };

async function  register (userFields){//only the 1st time
    const eUser=await userController.read({email:userFields.email});
    if(eUser.length) throw({code:400, message:"this email already exists"});
    return userController.create(userFields); 
};


async function register(data) {
  const { email, password, firstName, lastName } = data

  if (!email || !password || !firstName || !lastName)
    throw ({ code: 400, message: "missing data" })

  const existUser = await userController.readOne({ email })
  if (existUser) throw ({ code: 405, message: "duplicated email" })
  const salt= await bcrypt.genSalt();
  const hashedPassword=await bcrypt.hash(password, salt);
  data.salt=salt;
  data.hashedPassword=hashedPassword;



  const user = await userController.create(data)
  const token = jwtFn.createToken(user._id)
  return token
}

//exports.login=async(email, password)=>{}

// async function login(email, password){
//     //validate basic
//   //  if(!email||!password) throw({code:409, message:"missing data"});

//     //check if such a user exisst in our application
//    const eUser=await userController.read({email}, "password");
//    console.log(eUser);
//     if(eUser.length==0) throw({code:404, message:"user not found"});
//     //password 
//     // console.log(eUser);
//     // console.log(password);
//     // console.log(eUser[0].password);
//     if(password!==eUser[0].password) throw({code:503, message:"password mismatch"});
//    // console.log("bbb"+eUser[0]._id);
//    return createToken(eUser[0]._id);
//    // console.log("xxx")
//   //  return createToken(eUser[0]._id);
//    // return "success";
// }

async function login(loginData) {
  const password = loginData.password;
  const email = loginData.email;
  // const user = await userController.readOne({ email: email }, "+password");
  //hashedPassword:{
  const user = await userController.readOne({ email: email }, "+hashedPassword +salt");
  console.log("---------------", user,"----------------");
  if (!user) throw ({ code: 401, message: "user doesn't exist" });
  console.log("---------------","salt " ,user.salt,"----------------");
  const hashedPassword=await bcrypt.hash(password, user.salt); //user.salt  //"$2b$10$UNISooXZ69L4a/MjcI90yO"
  console.log("-----------user hashedPassword----", user.hashedPassword,"----------------");
  // if (user.password !== password) throw ({ code: 401, message: " unauthorized" });//bcrypt.compare
  if (user.hashedPassword !== hashedPassword) throw ({ code: 401, message: " unauthorized 2nd" });
  const token = jwtFn.createToken(user._id)
  return token
}


// exports.createUser=(userFields)=>{
//     return await userController.create(userFields);
// };
// exports.createUser=async (userFields)=>{
//     const eUser=await userController.read({email:userFields.email});
//     if(eUser.length) throw({code:400, message:"this email already exists"});
//     return userController.create(userFields);
// };

// exports.bla = () => { return { x: 'y' } }


// exports.createUser = (userFields) => {
//     return userController.create(userFields);
//   };

  
//    exports.del =async (id) => {
//     const x= await userController.del({_id:id});
//     if (!x) throw({code:400, message:"user not deleted"});
//     return x;
//     //return userController.del({ _id: id });
  
//   }


async function del(id) {
    const x= await userController.del({_id:id});
    if (!x) throw({code:400, message:"user not deleted"});
    return x;
    //return userController.del({ _id: id });
  
  }

// register(
//     {firstName:"Avraham",
//     lastName: "Goldberg",
//     email:"avrahamgoldberg@gmail.com" ,
//     password:"AvGo",
   
//     address: {
//         street: "kakal",
//         homeNum:22,
//         city:"Jerusalem",
//     },
//     gender: "male",
//     phoneNumber:"0543284095",
    
// })
// register(
//     {firstName:"Sarah",
//     lastName: "Minoun",
//     email:"sarahmi@walla.com" ,
//     password:"SarahMM",
   

//     gender: "female",
//     phoneNumber:"036524681",
 

// })

// login("sarahmi@walla.com","sarahMM")

// updateUser("62b2e15ea03719ff5f6cbc12",{phoneNumber:"05484775846"});
//del("62b2e0da020c4df51c454a99")

module.exports={getAllUsers,getUserDetailsById,del, updateUser, register, login}



  
