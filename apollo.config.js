module.exports = {
  client: {
    service: {
      name: "vochabular-admin",
      url: "http://vochabular-admin.herokuapp.com/api",
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
