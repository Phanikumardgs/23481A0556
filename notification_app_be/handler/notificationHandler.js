const { getPriorityNotifications, getFilteredNotifications } = require("../service/notificationService");
const { Log } = require("../../logging_middleware/index");

async function getTopNotifications(req, res) {
  try {
    const topN = parseInt(req.query.top) || 10;
    Log("backend", "info", "handler", `Request for top ${topN} priority notifications`);
    const notifications = await getPriorityNotifications(topN);
    res.json({ success: true, count: notifications.length, notifications });
  } catch (error) {
    Log("backend", "error", "handler", `Handler error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
}

async function getAllNotifications(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const notification_type = req.query.notification_type || null;
    Log("backend", "info", "handler", `Request for all notifications page=${page} limit=${limit} type=${notification_type}`);
    const result = await getFilteredNotifications(limit, page, notification_type);
    res.json({ success: true, ...result });
  } catch (error) {
    Log("backend", "error", "handler", `Handler error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { getTopNotifications, getAllNotifications };