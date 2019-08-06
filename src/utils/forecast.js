const request = require("request")

const forecast = (latitude, longtitude, callback) => {
	const url = "https://api.darksky.net/forecast/9e6f332ae9bf31cbde6fefaee555dab2/" + latitude + "," + longtitude + "?units=si&exclude=hourly,minutely,alerts,flags "
	request({url, json: true}, (error, response) => {
		if (error) {
			callback("Unable to connect to weather server!", undefined)
		} else if (response.body.error) {
			callback("Unable to find the location!", undefined)
		} else {
			callback(undefined, {
				summary: response.body.daily.data[0].summary,
				currently: response.body.currently.temperature
			})
		}
	})
}

module.exports = forecast
