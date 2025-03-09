const express = require("express");
const { faker } = require("@faker-js/faker"); 
const bodyParser = require("body-parser");
const cors = require("cors");
const { db } = require("./firebase");



const app = express();
app.use(cors());
app.use(bodyParser.json());

const usersCollection = db.collection("users");

// 📌 CREATE User(s)
app.post("/users", async (req, res) => {
    try {

		const users = faker.helpers.multiple(createRandomUser, {
			count: 50,
		});
		const batch = db.batch();
		const addedUsers = [];
		
		for(let user of users) {
			const docRef = usersCollection.doc();
			batch.set(docRef, user);
			addedUsers.push({ id: docRef.id, ...user });
		}

		await batch.commit();
		return res.status(201).json({ message: `${users.length} users added successfully`, users: addedUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// 📌 READ All Users
app.get("/users", async (req, res) => {
	try {
		const snapshot = await usersCollection.get();
		const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
		await usersCollection.doc(req.params.id).update(req.body);
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

// 📌 QUERY Users (Example: Filter by age)
app.get("/users/query/:age", async (req, res) => {
	try {
		const snapshot = await usersCollection
			.where("age", "==", Number(req.params.age))
			.get();
		const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});



const createRandomUser= () => {
	return {
		// userId: faker.string.uuid(),
		// username: faker.internet.username(), // before version 9.1.0, use userName()
		// email: faker.internet.email(),
		// avatar: faker.image.avatar(),
		// password: faker.internet.password(),
		// birthdate: faker.date.birthdate(),
		// registeredAt: faker.date.past(),
		name: faker.person.fullName(),
		email: faker.internet.email(),
		age: faker.number.int({ min: 18, max: 60 }),
		city: faker.location.city(),
		createdAt: Date.now(),
	};
}


const PORT = process.env.PORT || 6969;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
