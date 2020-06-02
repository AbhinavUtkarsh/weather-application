const weatherForm = document.querySelector('form')
const searchElement = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const messageThree = document.querySelector("#message-3")
const messageFour = document.querySelector("#message-4")
const messageFive = document.querySelector("#message-5")
const messageSix = document.querySelector("#message-6")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevents the default submit reload behavior 


    const location = searchElement.value;
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    messageThree.textContent = ""
    messageFour.textContent = ""
    messageFive.textContent = ""
    messageSix.textContent = ""
    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = ""
                messageThree.textContent = ""
                messageFour.textContent = ""
                messageFive.textContent = ""
                messageSix.textContent = ""
                messageTwo.textContent = data.error
            } else {
                messageTwo.textContent = ""
                messageOne.textContent = "Forecast: " + data.forecast
                messageThree.textContent = "Temperature: " + data.currtemp + " degree celsius"
                messageFour.textContent = "Feels like:  " + data.feelsLikeTemperature + " degree celsius"
                messageFive.textContent = "Humidity: " + data.humidity + "%"
                messageSix.textContent = "Location: " + data.location

            }
        })
    })
})