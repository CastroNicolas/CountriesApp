const axios = require("axios");

const getApiController = async () => {
  const { data } = await axios("http://localhost:5000/countries");
  return data;
};

module.exports = getApiController;