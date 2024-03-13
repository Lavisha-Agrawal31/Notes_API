const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req , res) =>{ // the work related to database is somewhat time consuming that's why using async

    //existing user check 
    // hashed password  - encrypt the password 
    //user creation 
    //token generation

    const {username, email, password} = req.body; // get data from request body , this three properties are there in req body
    try{
        const existingUser = await userModel.findOne({ email : email }); // findone func will check if  there is any user with this email id or not in the database 
        // await - only execute after the response of this func
        if(existingUser){
            return res.status(400).json({message : "User  already exists"});
        }

        const hashedPassword = await bcrypt.hash(password , 10); // it will salt the password 10 times 

        const result = await userModel.create({
            email : email,
            password : hashedPassword,
            username :username
        });

        const token = jwt.sign({email : result.email, id : result._id} , SECRET_KEY);

        res.status(201).json({user : result , token});

    } catch (error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}

const signin = async (req , res) =>{
    const  {email , password} = req.body;

    try {
        const existingUser = await userModel.findOne({ email : email });
        if(!existingUser){
            return res.status(404).json({message : "User not found"});
        }

        const matchPassword = await  bcrypt.compare(password , existingUser.password);
        
        if (!matchPassword ) {
            return res.status(400).json({ message: "Invalid Credentials"});
        }

        const token = jwt.sign({email : existingUser.email, id : existingUser._id} , SECRET_KEY);

        res.status(200).json({user : existingUser , token});


    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
}

module.exports = { signup , signin };