require("dotenv").config();
const cors = require("cors");
const express = require("express");

const app = express();
const port = process.env.PORT || 8000;

const HP = require("./Config/hpconfig");
const hproutes = require("./routes/hproutes");

app.use(cors({
  origin: "*",
}));

app.use(express.json());

HP.sync({ alter: true })
  .then(() => console.log("Tables synced"))
  .catch(err => console.log("Sync error:", err));

app.use("/api", hproutes);

app.listen(port, () => {
  console.log("Server running on port", port);
});
