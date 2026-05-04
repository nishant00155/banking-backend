const mongoose = require("mongoose")

function ConnectToDb(){
    mongoose.connect(process.env.MONGO_URI)

    .then(()=>{
        console.log("server is connected to db")
    })
    .catch(err=>{
        console.log("there is some error")
        process.exit(1)
    })
}

module.exports=ConnectToDb;