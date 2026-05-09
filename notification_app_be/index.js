const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Log } = require("../logging_middleware/index");
const notificationRoute = require("./route/notificationRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", notificationRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  Log("backend", "info", "service", `Server started on port ${PORT}`);
  console.log(`Server running on http://localhost:${PORT}`);
});