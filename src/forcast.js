const request = require("request");

const API_KEY = "00b4a2098740c744b8678587400e801b";

const forcast = (city, callback) => {
  const URL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;
  request({ url: URL, json: true }, (error, response) => {
    if (error) {
      callback("Network Error: please check your network!");
    } else if (response.body.error) {
      callback(response.body.error.info);
    } else {
      callback(undefined, response.body);
    }
  });
};

module.exports = {
  forcast: forcast,
};
