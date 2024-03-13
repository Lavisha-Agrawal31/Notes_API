const express = require("express");
const app = express();

const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");

const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const mongoose = require("mongoose");

app.use(express.json()); // converts the body of request in json

app.use(cors());


app.use((req , res , next)=>{ //middleware - security guard - can do token validation or anything before proceesing the request
    console.log("HTTP Method - " + req.method + " , URL - " + req.url); // log the request that are coming 
    next();
})

app.use("/users",userRouter);
app.use("/note",noteRouter);

app.get("/", (req,res) =>{
    res.send("hello");
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
.then(() =>{
    app.listen(PORT, () =>{
        console.log("Server is running on PORT", PORT);
    })
})

.catch((error)=>{
    console.log(error);
})
