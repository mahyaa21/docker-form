const express = require("express");
const path = require("path");
const { MongoClient, ServerApiVersion } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const uri = "mongodb://admin:pass@mongodb:27017";
// Middleware to parse URL-encoded bodies (form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve the form
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

// Serve the confirmation page
app.get("/confirmation", (req, res) => {
	res.sendFile(path.join(__dirname, "confirmation.html"));
});

// Route to handle form submissions
app.post("/submit", (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	let userObj = req.body;
	console.log(userObj, name, email);
	console.log("connecting to the db ...");

	// Create a MongoClient with a MongoClientOptions object to set the Stable API version
	const client = new MongoClient("mongodb://mahya:123456@localhost:27017", {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		},
	});


	async function run() {
		try {
			// Connect the client to the server
			await client.connect();
			// Send a ping to confirm a successful connection
			await client.db("admin").command({ ping: 1 });
			console.log("Connected successfully to server");

			const db = await client.db("my-db");
			userObj["userId"] = 1;
			const query = { userId: 1 };
			let newValues = { $set: userObj };

			// Use updateOne with upsert option
			const result = await db
				.collection("users")
				.updateOne(query, newValues, { upsert: true });
			if (result.upsertedCount > 0) {
				console.log("User created successfully");
			} else if (result.modifiedCount > 0) {
				console.log("User updated successfully");
			}

			res.redirect(`/confirmation?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
		} catch (err) {
			console.log(err);
			res.status(500).send("An error occurred while processing your request.");
		} finally {
			// Ensures that the client will close when you finish/error
			await client.close();
		}
	}

	run().catch(console.dir);
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
