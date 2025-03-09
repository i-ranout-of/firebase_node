🚀 Firebase Node.js CRUD+Q API

📌 Overview

This project is a CRUD+Q API built with Node.js, Express, and Firebase Firestore. It allows you to Create, Read, Update, Delete, and Query (CRUD+Q) users in Firestore.

🏗️ Features

✅ Create a user

📖 Read all users or a specific user

✏️ Update user details

🗑️ Delete a user

🔎 Query users efficiently

🛠️ Setup & Installation

1️⃣ Clone the Repository

git clone https://github.com/yourusername/firebase-node-crud.git
cd firebase-node-crud

2️⃣ Install Dependencies

npm install

3️⃣ Set Up Firebase

Go to Firebase Console → Create a Project.

Navigate to Project Settings → Service Accounts.

Click "Generate new private key" → Download serviceAccountKey.json.

Place serviceAccountKey.json in the root folder.

Create a .env file and add:

FIREBASE_SERVICE_ACCOUNT=./serviceAccountKey.json

4️⃣ Run the Server

npm start

The API will run on http://localhost:6969

📡 API Endpoints

📌 1. Create User

POST /users

{
  "name": "John Doe",
  "email": "john@example.com"
}

📤 Response: { "id": "newlyCreatedUserId" }

📌 2. Get All Users

GET /users
📤 Response:

[
  { "id": "userId1", "name": "John Doe", "email": "john@example.com" },
  { "id": "userId2", "name": "Jane Doe", "email": "jane@example.com" }
]

📌 3. Get User by ID

GET /users/:id
📤 Response:

{ "id": "userId", "name": "John Doe", "email": "john@example.com" }

📌 4. Update User

PUT /users/:id

{
  "name": "Updated Name",
  "email": "updated@example.com"
}

📤 Response: { "message": "User updated successfully" }

📌 5. Delete User

DELETE /users/:id
📤 Response: { "message": "User deleted successfully" }

🔐 Firestore Security Rules

For development, set Firestore rules to:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

⚠ Warning: This makes the database public. Use proper authentication in production.

🏗️ Folder Structure

/firebase-node-crud
│── /node_modules
│── index.js        # Main server file
│── firebase.js     # Firebase setup
│── package.json    # Dependencies
│── .gitignore      # Ignore sensitive files
│── .env            # Environment variables
│── serviceAccountKey.json (DO NOT COMMIT!)

🔥 Deployment

Deploy to Firebase Functions: Guide

Deploy to Render/Vercel: Guide

🎯 To-Do (Future Enhancements)

🔐 Add authentication (JWT/Firebase Auth)

⚡ Implement pagination for large data

🛡️ Secure Firestore with authentication-based rules

📊 Add analytics & logging

🛠️ Tech Stack

Node.js & Express - Backend

Firebase Firestore - Database

Firebase Admin SDK - Authentication

dotenv - Environment variables

🤝 Contributing

Pull requests are welcome! Open an issue for bug reports or feature requests.

📜 License

MIT License © 2025 Your Name

Prince