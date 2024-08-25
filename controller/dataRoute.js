const express=require("express");
const dataSchema=require("../model/dataSchema");
const dataRoute=express.Router();

dataRoute.post("/", (req, res) => {
    const inputData = req.body.data;
    const fullName = "john_doe"; 
    const dob = "17091999";
    const userId = `${fullName}_${dob}`;
    const email = "john@xyz.com"; 
    const rollNumber = "ABCD123"; 

    const alphabets = inputData.filter(char => /^[a-zA-Z]$/.test(char));
    const numbers = inputData.filter(char => /^[0-9]$/.test(char));
    const highestLowercase = alphabets
        .filter(char => char === char.toLowerCase())
        .sort()
        .pop() || "";

    const response = {
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    };

    // Save the data to the database
    const dataToSave = new dataSchema({
        user_id: userId,
        email: email,
        roll_number: rollNumber,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercase
    });

    dataToSave.save((err) => {
        if (err) {
            return res.status(500).json({ is_success: false, message: "Internal Server Error" });
        }
        res.json(response);
    });
});

dataRoute.get("/", async (req, res) => {
    try {
       
        const response = {
            operation_code: 1
        };
        
        res.json(response);  
    } catch (err) {
        console.error(err);  
        res.status(500).json({ error: "An error occurred while processing the request." });
    }
});


module.exports=dataRoute;