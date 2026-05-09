const axios = require("axios");
const { getToken } = require("../config/auth");
const { Log } = require("../../logging_middleware/index");
require("dotenv").config();

const TYPE_WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function fetchAllFromAPI() {
  const token = await getToken();
  const response = await axios.get(
    `${process.env.BASE_URL}/notifications`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.notifications;
}

async function getPriorityNotifications(topN = 10) {
  try {
    Log("backend", "info", "service", "Fetching notifications for priority inbox");
    const notifications = await fetchAllFromAPI();
    const scored = notifications.map((n) => {
      const typeScore = TYPE_WEIGHT[n.Type] || 0;
      const recencyScore = new Date(n.Timestamp).getTime();
      const priorityScore = typeScore * 1e13 + recencyScore;
      return { ...n, priorityScore };
    });
    const top = scored.sort((a, b) => b.priorityScore - a.priorityScore).slice(0, topN);
    Log("backend", "info", "service", `Returning top ${topN} priority notifications`);
    return top;
  } catch (error) {
    Log("backend", "error", "service", `Priority fetch failed: ${error.message}`);
    throw error;
  }
}

async function getFilteredNotifications(limit = 10, page = 1, notification_type = null) {
  try {
    Log("backend", "info", "service", `Fetching filtered notifications type=${notification_type}`);
    let notifications = await fetchAllFromAPI();

    if (notification_type) {
      notifications = notifications.filter(n => n.Type === notification_type);
    }

    const total = notifications.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginated = notifications.slice(start, start + limit);

    Log("backend", "info", "service", `Returning page ${page} of ${totalPages}`);
    return { notifications: paginated, total, page, totalPages, limit };
  } catch (error) {
    Log("backend", "error", "service", `Filtered fetch failed: ${error.message}`);
    throw error;
  }
}

module.exports = { getPriorityNotifications, getFilteredNotifications };