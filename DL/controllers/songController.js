
const { songModel } = require('../models/song')

async function create(data) {
    return await songModel.create(data);
}
async function read(filter, proj) {
    return await songModel.find(filter, proj);
}

async function readOne(filter, proj) {
    return await songModel.findOne(filter, proj);
}

async function updateOne(filter, newData) {
    return await songModel.updateOne(filter, newData);
}
async function del(filter) {
    return await songModel.update(filter, { isActive: false })
}

module.exports = { create, read,readOne, updateOne, del }