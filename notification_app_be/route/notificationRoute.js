const express = require("express");
const router = express.Router();
const { getTopNotifications, getAllNotifications } = require("../handler/notificationHandler");

// Priority route MUST come before the general route
router.get("/notifications/priority", getTopNotifications);
router.get("/notifications", getAllNotifications);

module.exports = router;