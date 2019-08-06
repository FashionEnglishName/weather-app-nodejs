const express = require("express")
const path = require("path")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

const publicDirectorypath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectorypath))

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "MD"
	})
})

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		name: "MD"
	})
})


app.get("/about", (req, res) => {
	res.render("about", {
		title: "About",
		name: "MD"
	})
})


app.get("/weather", (req, res) => {
	if(!req.query.address) {
		return res.send({
			Error: "You must provide an address"
		})
	}

	geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
		if(error) {
			res.send({
				Error: error
			})
		}

		forecast(latitude, longtitude, (error, forecastData) => {
			if(error) {
				res.send({
					Error: error
				})
			}

			res.send({
				location: location,
				forecast: forecastData,
				address: req.query.address
			})
		})
	})

	// res.send({
	// 	forecast: "forecast",
	// 	location: "location",
	// 	address: req.query.address
	// })
})

app.get("/products", (req, res) => {
	if(!req.query.search) {
		return res.send({
			Error: "You must provide a search term"
		})
	}

	console.log(req.query.search)
	res.send({
		product: []
	})
})


app.get("/help/*", (req, res) => {
	res.render('404', {
		title: "404 Page",
		name: "MD",
		errorMessage: "Help article not found."
	})
})

app.get("*", (req, res) => {
	res.render('404', {
		title: "404 Page",
		name: "MD",
		errorMessage: "Page not found."
	})
})

app.listen(3000, () => {
	console.log("Listenning 3000 port!")
})