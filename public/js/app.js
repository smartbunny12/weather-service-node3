console.log("client side javascript file is loaded")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
// show error
const messageOne = document.querySelector('#message-1')
// show forecast data
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
           
            }
        
        })
    })
    
})