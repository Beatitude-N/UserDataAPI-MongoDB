const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    username: {
        type: String,
        required: [true, "Please add the contact user name"],
        unique: [true, "Username already taken"],
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Username already taken"],
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
    },
},
{
    timestamps: true,
})

module.exports = mongoose.model("user", userSchema);   