const playlistLogic = require('../BL/playlistLogic');
const express = require('express');
const router = express.Router();




router.post('/newpl', async (req, res) => {
    try {
        console.log(1);
        const newpl = await playlistLogic.createNewplaylist(req.body);
        console.log(2);
        console.log("newpl" + newpl);
        res.send(newpl);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message ||"sorry something went wrong");
    }

})
router.post('/addtopl', async (req, res) => {

    try {
        console.log("update pl");
        const updatedPl = await playlistLogic.addSongInPlaylist(req.body);
        res.send(updatedPl);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message || "sorry something went wrongggg");
    }

})

router.post('/removefrompl', async (req, res) => {
    try {
        console.log("update pl");

        const updatedPl = await playlistLogic.removeSongFromPlaylist(req.body);
        // const users=await userLogic.getUserDetailsById(req.query.id);
        //62b2e0da020c4df51c454a99
        //const users=await userLogic.getAllUsers();
        //const newpl=  await playlistLogic.createNewplaylist(req.body);
        console.log(2);
        console.log("newpl" + updatedPl);
        res.send(updatedPl);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message ||"sorry something went wrong");
    }

})

router.get('/myplaylists', async (req, res) => { //authJWT??
    try {
      
        const result = await playlistLogic.getAllPlaylists(req.body);
     
        res.send(result)
    }
    catch (err) {
        res.send(err)
    }
})
module.exports = router;
