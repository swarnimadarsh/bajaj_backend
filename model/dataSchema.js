const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    email: { type: String, required: true },
    roll_number: { type: String, required: true },   
    numbers: { type: [String], default: [] },      
    alphabets: { type: [String], default: [] },   
    highest_lowercase_alphabet: { type: String, default: "" } 
}, {
    collection: "data",
    timestamps: true
});

module.exports = mongoose.model("dataSchema", dataSchema);
