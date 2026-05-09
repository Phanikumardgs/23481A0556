const axios = require("axios");

const clientID = "6e0296c2-0b87-4c6a-a960-9d481c28945c";
const clientSecret = "aGutHxxTgHQCRPUS";
const email = "phanikumardgs@gmail.com";
const name = "phani Kumar";
const rollNo = "23481a0556";
const accessCode = "eJdCuC";

const BASE_URL = "http://4.224.186.213/evaluation-service";

// Get auth token
async function getToken() {
  const response = await axios.post(`${BASE_URL}/auth`, {
    email,
    name,
    rollNo,
    accessCode,
    clientID,
    clientSecret,
  });
  return response.data.access_token;
}

// Reusable Log function
async function Log(stack, level, pkg, message) {
  try {
    const token = await getToken();
    const response = await axios.post(
      `${BASE_URL}/logs`,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Log created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Logging failed:", error.response?.data || error.message);
  }
}

module.exports = { Log };