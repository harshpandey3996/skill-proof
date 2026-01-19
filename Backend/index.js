require("dotenv").config();
const cors = require("cors");
const express = require("express");

const app = express();
const port = process.env.PORT || 8000;

const hproutes = require("./routes/hproutes");

app.use(cors({ origin: "*" }));
app.use(express.json());

// ❌ PRODUCTION में sync मत चलाओ
// HP.sync({ alter: true });

app.use("/api", hproutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
