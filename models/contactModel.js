const mongoose = require("mongoose")

const contactSchema =mongoose.Schema({

    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    email: {
        type: String,
        required: [true, "Please add the contact email address"],
    },
    phone: {
        type: String,
        required: [true, "Please add the contact phone number"],
    },
    country: {
        type: String,
        required: [true, "Please add the contact country"],
    }

},
{
    timestamps: true,
});

module.exports = mongoose.model("contact", contactSchema);  
