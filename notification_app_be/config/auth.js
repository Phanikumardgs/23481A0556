const axios = require("axios");
require("dotenv").config();

async function getToken() {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/auth`,
      {
        email: "phanikumardgs@gmail.com",
        name: "phani kumar",
        rollNo: "23481a0556",
        accessCode: "eJdCuC",
        clientID: "6e0296c2-0b87-4c6a-a960-9d481c28945c",
        clientSecret: "aGutHxxTgHQCRPUS"
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting token:", error.response?.data || error.message);
  }
}

module.exports = { getToken };