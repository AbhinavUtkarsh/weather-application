const path = require("path")
const express = require("express")
const hbs = require("hbs")
const forecast = require(path.join(__dirname, "/utils/forecast"))
const geocode = require(path.join(__dirname, "/utils/geocode"))

const app = express()
const port = (process.env.PORT || 3015)

// Define paths for Express config
const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDir))

app.get("", (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Pri"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Pri"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Pri"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "provide an address" })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Pri",
        error: "help article not found"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Pri",
        error: "page not found"
    })
})


app.listen(port, () => {
    console.log("Server is up and running on port " + port)
})