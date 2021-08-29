const request= require('request');

const forecast = (longitude, latitude, callback) => {
    const weather_url = `http://api.weatherstack.com/current?access_key=323b42d3dd298dbb2f729d54eb227332&query=${latitude},${longitude}&units=f`;
    request({ url: weather_url, json: true }, (error, {body}) => {
      if (error) {
        callback("Unable to connect to weather service", undefined);
      } else if (body.error) {
        callback("Unable to find location", undefined);
      } else {
        callback(
          undefined,
          body.current.weather_descriptions +
            ". It is currently " +
            body.current.temperature +
            " Fahrenheit out. It feels like " + body.current.feelslike+ " degress out. The humidity is "+body.current.humidity+ "%. There is a " +
            body.current.precip +
            "% chance of rain."
        );
      }
    });
  };

module.exports = forecast;