# MarathonHub Backend

## Project Overview

The MarathonHub backend is a RESTful API server built to support the MarathonHub client application. It manages marathon data, user registrations, authentication verification, and securely handles user requests. The server provides endpoints for retrieving marathon events, registering users, and administering marathon-related operations, ensuring seamless integration with the frontend client.

## Key Features

- **Marathon Management:** Create, read, update, and delete marathon events stored in a MongoDB database.
- **User Registration Handling:** Manage marathon applications submitted by authenticated users.
- **Secure Authentication:** Uses Firebase Admin SDK to verify user tokens and protect routes.
- **JWT Token Generation:** Issues JSON Web Tokens to authenticate users and authorize access.
- **Email-Based Data Filtering:** Supports fetching user-specific marathon registrations based on email.
- **CORS Enabled:** Proper Cross-Origin Resource Sharing setup for client-server communication.
- **Error Handling & Validation:** Robust input validation and error response mechanisms.
- **Scalable & Maintainable:** Built with Express.js and modularized for easy extension.

## Technologies Used

- **Node.js & Express.js** — Backend server and API routing
- **MongoDB & Mongoose** — NoSQL database for storing marathon and registration data
- **Firebase Admin SDK** — Authentication token verification and security
- **JSON Web Token (JWT)** — User authentication and authorization
- **Cors** — Enable cross-origin requests from client application
- **dotenv** — Manage environment variables securely
