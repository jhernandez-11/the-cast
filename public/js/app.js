const searchButton = document.querySelector('#search-button')
const locationButton = document.querySelector('#location-button')
const search = document.querySelector('.header__input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

searchButton.addEventListener('click',(e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = 'Loading...'

    fetch('/weather?address=' + location).then((response) => {
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

locationButton.addEventListener('click',(e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = 'Loading...'

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser!')
    }

    locationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const location = longitude + ',' + latitude

        fetch('/weather?address=' + location).then((response) => {
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
})
