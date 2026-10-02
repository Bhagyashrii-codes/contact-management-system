const db = require("../config/db");

// ADD CONTACT
const addContact = (req, res) => {
const { name, email, phone, address, company } = req.body;


if (!name || !email || !phone) {
    return res.status(400).json({
        message: "Name, email, and phone are required"
    });
}

const sql = `
    INSERT INTO contacts (name, email, phone, address, company)
    VALUES (?, ?, ?, ?, ?)
`;

db.query(
    sql,
    [name, email, phone, address || null, company || null],
    (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    message: "A contact with this email or phone already exists"
                });
            }

            console.error(err);

            return res.status(500).json({
                message: "Failed to add contact"
            });
        }

        res.status(201).json({
            message: "Contact added successfully",
            contactId: result.insertId
        });
    }
);


};

// GET CONTACTS + SEARCH + SORT + PAGINATION
const getContacts = (req, res) => {
const { search, sort } = req.query;


const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 5;
const offset = (page - 1) * limit;

let sql = "SELECT * FROM contacts";
let values = [];

// SEARCH
if (search) {
    sql += `
        WHERE name LIKE ?
        OR email LIKE ?
        OR phone LIKE ?
        OR company LIKE ?
    `;

    const searchValue = `%${search}%`;

    values = [
        searchValue,
        searchValue,
        searchValue,
        searchValue
    ];
}

// SORT
if (sort === "name") {
    sql += " ORDER BY name ASC";
} else if (sort === "name_desc") {
    sql += " ORDER BY name DESC";
}

// PAGINATION
sql += " LIMIT ? OFFSET ?";

values.push(limit, offset);

db.query(sql, values, (err, results) => {
    if (err) {
        console.error(err);

        return res.status(500).json({
            message: "Failed to fetch contacts"
        });
    }

    res.status(200).json({
        page: page,
        limit: limit,
        contacts: results
    });
});


};

// GET CONTACT BY ID
const getContactById = (req, res) => {
const { id } = req.params;


const sql = "SELECT * FROM contacts WHERE id = ?";

db.query(sql, [id], (err, results) => {
    if (err) {
        console.error(err);

        return res.status(500).json({
            message: "Failed to fetch contact"
        });
    }

    if (results.length === 0) {
        return res.status(404).json({
            message: "Contact not found"
        });
    }

    res.status(200).json(results[0]);
});


};

// UPDATE CONTACT
const updateContact = (req, res) => {
const { id } = req.params;
const { name, email, phone, address, company } = req.body;


if (!name || !email || !phone) {
    return res.status(400).json({
        message: "Name, email, and phone are required"
    });
}

const sql = `
    UPDATE contacts
    SET name = ?, email = ?, phone = ?, address = ?, company = ?
    WHERE id = ?
`;

db.query(
    sql,
    [name, email, phone, address || null, company || null, id],
    (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    message: "A contact with this email or phone already exists"
                });
            }

            console.error(err);

            return res.status(500).json({
                message: "Failed to update contact"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Contact not found"
            });
        }

        res.status(200).json({
            message: "Contact updated successfully"
        });
    }
);


};

// DELETE CONTACT
const deleteContact = (req, res) => {
const { id } = req.params;


const sql = "DELETE FROM contacts WHERE id = ?";

db.query(sql, [id], (err, result) => {
    if (err) {
        console.error(err);

        return res.status(500).json({
            message: "Failed to delete contact"
        });
    }

    if (result.affectedRows === 0) {
        return res.status(404).json({
            message: "Contact not found"
        });
    }

    res.status(200).json({
        message: "Contact deleted successfully"
    });
});


};

module.exports = {
addContact,
getContacts,
getContactById,
updateContact,
deleteContact
};
