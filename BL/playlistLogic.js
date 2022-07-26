require('../DL/db').connect();
const playlistController = require('../DL/controllers/playlistController');
const userController = require('../DL/controllers/userController');


async function createNewplaylist(data) {
    //check only with _id? or use email?--> think about it how will we save loggin user...
    const email = data.email;
    const playlistUser = await userController.read({ email: email });
    console.log("----------", playlistUser,"------------");
    if (playlistUser.length==0) throw ({ code: 409, message: "user not exist" });

    const pl = await playlistController.read({ userId:data.userId, title:data.title })
    if (pl) throw ({ code: 405, message: "playlist already exists" });

    const playlist = await playlistController.create(data);

    return playlist;
}
async function addSongInPlaylist({ songId, title, userId }) {
    const playlist = await playlistController.read({ userId, title })
    if (!playlist) throw ({ code: 409, message: "playlist not exist" });
    let a = playlist[0].songs //find
    let songInPl=a.filter(v=>v.songId==songId)
    if (songInPl.length > 0) throw({code:410, message:"this song already exists in this playlist"})
    console.log("------------", songInPl, "------------");
    console.log("------------------song----",songId, "----------------------");
    const updatedPlaylist = await playlistController.update({ "title": title, "userId": userId }, { "$push": { "songs": { "songId": songId } } },

        function (err, raw) {
            if (err) return handleError(err);
        }
    )
    return updatedPlaylist;
}

async function removeSongFromPlaylist({ songId, title, userId }) {
    const playlist = await playlistController.read({ userId, title });
    if (!playlist) throw ({ code: 409, message: "playlist not  exist" });
    let a = playlist[0].songs 
    let songInPl=a.filter(v=>v.songId==songId);
    console.log("------------", songInPl, "------------");
    console.log("------------------song----",songId, "----------------------");
    if (songInPl.length == 0) throw({code:410, message:"this song doesn't belong to this playlist. It can't be removed from it!"})
    const pl = await playlistController.update({ title: title ,"songId":songId}, { "$pull": { "songs": { songId: songId } } },
        function (err, raw) {
            if (err) return handleError(err);
            console.log('The raw response from Mongo was ', raw);
        }
    )
    return pl;
}

async function getAllPlaylists({userId}){
    console.log("begin  get allpl in logic");
    const playlist = await playlistController.read({ userId});
    if (!playlist) throw ({ code: 409, message: "this user has no playlists" });
    console.log("------PL-----------", playlist,"------------------------");
    console.log("------PL--title---------", playlist[0].title,"------------------------");
    console.log("------PL---songs--------", playlist[0].songs,"------------------------");
    return playlist;

}

module.exports = { createNewplaylist, addSongInPlaylist, removeSongFromPlaylist,getAllPlaylists }