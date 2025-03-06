const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { db } = require("./firebase");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const usersCollection = db.collection("users");

// 📌 CREATE User
app.post("/users", async (req, res) => {
    try {
        const payload = req.body;
        const docRef = await usersCollection.add(payload);
        res.status(201).json({ id: docRef.id});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 READ All Users
app.get("/users", async (req, res) => {
    try {
        const snapshot = await usersCollection.get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 READ User by ID
app.get("/users/:id", async (req, res) => {
    try {
        const doc = await usersCollection.doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 UPDATE User
app.put("/users/:id", async (req, res) => {
    try {
        const { name, email } = req.body;
        await usersCollection.doc(req.params.id).update({ name, email });
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 DELETE User
app.delete("/users/:id", async (req, res) => {
    try {
        await usersCollection.doc(req.params.id).delete();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
