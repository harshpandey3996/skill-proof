require("dotenv").config();
const cors = require("cors");
const express = require("express");

const app = express();
const port = process.env.PORT || 8000;

const hproutes = require("./routes/hproutes");
const sequelize = require("./Config/hpconfig"); 

app.use(cors({ origin: "*" }));
app.use(express.json());


sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully");

    app.listen(port, () => {
      console.log("Server running on port", port);
    });
  })
  .catch(err => console.log("Error syncing database:", err));

// Routes
app.use("/api", hproutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running");
});
