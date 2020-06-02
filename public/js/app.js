const weatherForm = document.querySelector('form')
const searchElement = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevents the default submit reload behavior 


    const location = searchElement.value;
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = ""
                messageTwo.textContent = data.error
            } else {
                messageTwo.textContent = ""
                messageOne.textContent = "Currently it's " + data.forecast + " in " + data.location

            }
        })
    })
})