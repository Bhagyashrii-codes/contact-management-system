# Contact Management System API

A backend REST API for managing personal and professional contacts.

## Technologies Used

* Node.js
* Express.js
* MySQL
* Postman
* JavaScript
## Features

* Add a new contact
* View all contacts
* View a contact by ID
* Update a contact
* Delete a contact
* Search contacts
* Sort contacts by name
* Pagination
* Required-field validation
* Duplicate email and phone prevention
* MySQL database integration
* Meaningful HTTP status codes and error messages

## Contact Fields

Each contact contains:

* Name
* Email
* Phone
* Address
* Company

## API Endpoints

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| POST   | `/contacts`     | Add a new contact |
| GET    | `/contacts`     | Get contacts      |
| GET    | `/contacts/:id` | Get contact by ID |
| PUT    | `/contacts/:id` | Update contact    |
| DELETE | `/contacts/:id` | Delete contact    |

## Search

Search contacts by name, email, phone, or company.

Example:

`GET /contacts?search=Bhagu`

## Sorting

Sort contacts by name from A to Z:

`GET /contacts?sort=name`

Sort contacts by name from Z to A:

`GET /contacts?sort=name_desc`

## Pagination

Get contacts page by page.

Example:

`GET /contacts?page=1&limit=2`

## Example Request

### Add Contact

```json
{
  "name": "Bhagu",
  "email": "bhagu@example.com",
  "phone": "9876543210",
  "address": "Bangalore",
  "company": "CodSoft"
}
```

## HTTP Status Codes

* `200` — Request successful
* `201` — Contact created successfully
* `400` — Invalid or missing input
* `404` — Contact not found
* `409` — Duplicate email or phone
* `500` — Server/database error

## Project Structure

```text
contact-management-system/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── contactController.js
│
├── routes/
│   └── contactRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## How to Run

### 1. Install dependencies

```bash
npm install
```

### 2. Configure MySQL

Create the database and `contacts` table in MySQL.

Configure the database connection using the `.env` file.

### 3. Start the server

```bash
node server.js
```

The API runs on:

`http://localhost:3000`

## Testing

The API was tested using Postman for:

* Creating contacts
* Retrieving contacts
* Searching
* Sorting
* Pagination
* Updating contacts
* Deleting contacts
* Validation and duplicate handling

## Project Purpose

This project was developed as part of the CodSoft Backend Development Internship to demonstrate REST API development, database integration, CRUD operations, validation, and API testing.
