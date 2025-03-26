const express = require("express");
const { faker } = require("@faker-js/faker");
const bodyParser = require("body-parser");
const cors = require("cors");
const { db } = require("./firebase");
const cron = require("node-cron");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const usersCollection = db.collection("users");


// Function to update "is_boomer" field based on age
// const updateBoomerStatus = async () => {
// 	try {
// 		const snapshot = await usersCollection.get();
// 		const batch = db.batch();

// 		snapshot.docs.forEach((doc) => {
// 			const user = doc.data();
// 			const isBoomer = user.age > 50;
// 			batch.update(doc.ref, { is_boomer: isBoomer });
// 		});

// 		await batch.commit();
// 		console.log("Boomer status updated for all users");
// 	} catch (error) {
// 		console.error("Error updating boomer status:", error);
// 	}
// };


const deleteBoomerStatus = async () => {
	try {
			const snapshot = await usersCollection.where("is_boomer", "==", true).get();
			if (snapshot.empty) {
				console.log("✅ No users to delete.");
				return;
			}
			const batch = db.batch();
			snapshot.docs.forEach((doc) => {
				batch.delete(doc.ref);
			});

			await batch.commit();
			console.log("Boomer status users are deleted");
	} catch (error) {
		console.error("Error updating boomer status:", error);
	}
};


// Schedule cron job to update "is_boomer" every 5 minutes
cron.schedule("*/5 * * * *", async () => {
	console.log("Running scheduled task: Updating boomer status");
	await deleteBoomerStatus();
});

deleteBoomerStatus();





