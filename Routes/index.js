// module.exports=(req,res)=>{
//     res.send("bdcfj");
// };

const express = require("express");
const router=express.Router();

const usersRouter=require("./userRoute");
const playlistsRouter=require("./playlistsRoute");
// const itemsRouter=require("./itemRoute");
// const ordersRouter=require("./orderRoute");


router.use("/users",usersRouter); //in url nituv
router.use("/playlists",playlistsRouter);
// router.use("/orders",ordersRouter);

module.exports = router;