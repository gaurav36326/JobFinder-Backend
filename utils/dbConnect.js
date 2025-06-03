const { log, error } = require('console');
const mongoose = require('mongoose');


const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.Mongo_Uri);
        console.log("connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect