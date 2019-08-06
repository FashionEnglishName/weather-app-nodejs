const request = require("request")

const geocode = (address, callback) => {
	const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWluZ2h1aWQiLCJhIjoiY2p4ZnAwajg3MG80YzNvcDZ3M3FncDNieiJ9.mSkn1Pj3GXj4YObqdZ-86Q&limit=1"

	request({url, json: true}, (error, response) => {
		if (error) {
			callback("Unable to connect to location server!", undefined)
		} else if (response.body.features.length === 0) {
			callback("Unable to find location!", undefined)
		} else {
			callback(undefined, {
				latitude: response.body.features[0].center[1],
				longtitude: response.body.features[0].center[0],
				location: response.body.features[0].place_name
			})
		}
	})
}

module.exports = geocode