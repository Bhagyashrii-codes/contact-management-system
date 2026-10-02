const express = require("express");

const router = express.Router();

const {
addContact,
getContacts,
getContactById,
updateContact,
deleteContact
} = require("../controllers/contactController");

// POST - Add a new contact
router.post("/", addContact);

// GET - Get all contacts
router.get("/", getContacts);

// GET - Get one contact by ID
router.get("/:id", getContactById);

// PUT - Update contact
router.put("/:id", updateContact);

// DELETE - Delete contact
router.delete("/:id", deleteContact);

module.exports = router;
