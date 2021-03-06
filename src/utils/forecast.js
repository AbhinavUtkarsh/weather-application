const request = require("request")
const keys = require("./keys")
const key = keys.weather

const forecast = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=" + key + "&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude)// + "&units=f"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the weather service", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            const currentTemperature = body.current.temperature
            const feelsLikeTemperature = body.current.feelslike
            const humidity = body.current.humidity
            callback(undefined, { forecast: body.current.weather_descriptions[0], currtemp: currentTemperature, feelsLikeTemperature: feelsLikeTemperature, humidity: humidity }
            )
        }
    })
}
module.exports = forecast
