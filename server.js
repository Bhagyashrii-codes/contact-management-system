const express = require("express");
const db = require("./config/db"); 
const contactRoutes = require("./routes/contactRoutes"); 
const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Contact Management System API is running!");
});

app.use("/contacts", contactRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
