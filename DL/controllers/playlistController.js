const { playlistModel } = require('../models/playlist')

async function create(data) {
    console.log("create pl in controller")
    return await playlistModel.create(data);
}
async function read(filter, proj) {
    const plExists = await playlistModel.find(filter);
    console.log("pl from read in controller " + plExists);
    if (plExists.length > 0) {
        //  console.log("pl already exists");
        return plExists;
        //throw({code:402, message:"this pl already exists"});
    }
    //return  await playlistModel.find(filter, proj)
    //.populate('userId')
    //.populate('song.songId');

}
async function update(filter, newData) {
    console.log("pl update in controller " + filter + " " + newData);
    return await playlistModel.updateOne(filter, newData);
}

module.exports = { create, read, update }