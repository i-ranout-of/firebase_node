const admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

admin.initializeApp({
    credential: admin.credential.cert(require(process.env.FIREBASE_SERVICE_ACCOUNT))
});

const db = admin.firestore();
module.exports = { db };
