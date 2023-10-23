const asyncHandler = require("express-async-handler")
const contact = require("../models/contactModel");


//@desc Get all contacts
//@route GET /api/contacts
//@acess private
const getContacts = asyncHandler(async (req,res)=>{
    const contacts = await contact.find({user_id: req.user.id})

    return res.status(200).json({
        success: true,
        message: "Contacts retrieved successfully",
        data: contacts,
    });
});

//@desc Create New contact
//@route POST /api/contacts
//@acess private
const createContact = asyncHandler(async (req,res)=>{
    console.log("The request body is:", req.body);

    const {name, email, phone, country} = req.body;
    if (!name || !email || !phone || !country) {
        return res.status(400).json({
             success: false,
             message: "All fields are mandatory" 
            });
    }

    const newContact = await contact.create({
        name,
        email,
        phone,
        country,
        user_id: req.user.id
    });


    return res.status(201).json({
        success: true,
        message: "Contact created successfully",
        data: newContact,
    })
})

//@desc Get contact
//@route GET /api/contacts/:id
//@acess private
const getContact = asyncHandler(async (req,res)=>{
    const getContact = await contact.findById(req.params.id);

    if (!getContact){
        return res.status(404).json({
             success: false, 
             message: "Contact not found" 
            });
    }

    return res.status(200).json({
         success: true, 
         message: "Contact found", 
         data: getContact 
        });
})

//@desc Update contact
//@route PUT /api/contacts:id
//@acess private
const updateContact = asyncHandler(async (req,res)=>{
  
    const updateContact = await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    if (!updateContact) {
        return res.status(404).json({
             success: false, 
             message: "Contact not found" 
            });
    }

    if (updateContact.user_id.toString() !== req.user.id) {

        return res.status(403).json({
            success: false, 
            message: "User don't have permission to update other user contacts" 
           });
     }

    return res.status(200).json({
         success: true, 
         message: "Contact updated successfully", 
         data: updateContact 
        });

})

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@acess private 

const deleteContact = asyncHandler(async (req, res) => {
    const contactId = req.params.id;

  
        // Use contact.findByIdAndDelete to delete a contact by ID
        const deletedContact = await contact.findByIdAndDelete(contactId,);

        if (!deletedContact) {
            return res.status(404).json({
                 success: false, 
                 message: "Contact not found" 
                });
        }

        if (deletedContact.user_id.toString() !== req.user.id) {

        return res.status(403).json({
            success: false, 
            message: "User don't have permission to update other user contacts" 
           });
     }

        res.json({
             success: true, 
             message: `Contact with ID ${contactId} deleted successfully`, 
             data: deletedContact 
            });

});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};


