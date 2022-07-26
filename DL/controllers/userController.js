

const { userModel } = require('../models/user')

async function create(data) {
    return await userModel.create(data);
}
async function read(filter, proj) {
    return await userModel.find(filter, proj);
}

async function readOne(filter, proj) {
    return await userModel.findOne(filter, proj);
}
async function updateOne(filter, newData) {
    return await userModel.updateOne(filter, newData);
}
async function del(filter) {
    return await userModel.updateOne(filter, { isActive: false })
}
// const user1={firstName:"Avraham",
// lastName: "Goldberg",
// email:"avrahamgoldberg@gmail.com" ,
// password:"AvGo",
// gender: "male",
// }
// create(user1)





module.exports = { create, read,readOne, updateOne, del }
