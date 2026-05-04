require("dotenv").config()


const app = require("./src/app")
const connectTODb = require("./src/config/db")

connectTODb()

app.listen(3000,()=>{
    console.log("server is running");
})