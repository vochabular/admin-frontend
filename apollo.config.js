module.exports = {
  client: {
    service: {
      name: "vochabular-admin-backend",
      url: "http://vochabular-admin-backend.herokuapp.com/api",
      // optional headers
      /*
      headers: {
        authorization: "Bearer lkjfalkfjadkfjeopknavadf"
      },
      */
      // optional disable SSL validation check
      skipSSLValidation: true
    }
  }
};
