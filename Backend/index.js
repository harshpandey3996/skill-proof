require("dotenv").config();
const cors = require("cors");
const express = require("express");

const app = express();
const port = process.env.PORT || 8000;

const hproutes = require("./routes/hproutes");
const HP = require("./model/hpmodel"); // Sequelize model

app.use(cors({ origin: "*" }));
app.use(express.json());

// Sync table and add missing columns (like phone)
HP.sync({ alter: true })
  .then(() => console.log("Database table synced successfully"))
  .catch(err => console.log("Error syncing database table:", err));

// Routes
app.use("/api", hproutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running");
});

// Start server
app.listen(port, () => {
  console.log("Server running on port", port);
});
