require("dotenv").config();

module.exports = {
  client: {
    service: {
      name: "vochabular-admin-hasura",
      url: process.env.REACT_APP_BACKEND_URL,
      headers: {
        "x-hasura-admin-secret": process.env.REACT_APP_ADMIN_SECRET
      }
    }
  }
};
