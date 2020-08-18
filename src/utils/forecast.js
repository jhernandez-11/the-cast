const request = require("request")

// const urlWeather = 'http://api.weatherstack.com/current?access_key=7f52f87871bb95a8a0a2cac4d02a088f&query=94580&units=f'

// request({ url: urlWeather, json:true }, (error, response) => {
//     if (error) {
//         console.log('Cannot connect to weather app!')
//     } else if (response.body.error) {
//         console.log('Unable to find location!')
//     } else {
//         const currentTemperature = response.body.current.temperature
//         const feelsLike = response.body.current.feelslike
//         const weatherDescription = response.body.current.weather_descriptions[0]

//         console.log(weatherDescription + '. It is currently ' + currentTemperature + '. Feels like ' + feelsLike + '.')
//     }
// })

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7f52f87871bb95a8a0a2cac4d02a088f&query=' + longitude + ',' + latitude + '&units=f'
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Cannot connect to weather app!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            if (body.current.temperature > 100) {
                callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}, in other words, it's like being inside an oven outside!!! Feels like ${body.current.feelslike}, I wonder if anyone is wearing a sweater in this area. The humidity is ${body.current.humidity}, does a higher humidty help with heat, or make it worse?`)
            } else if (body.current.temperature > 90 && body.current.temperature < 99) {
                callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}, remember to stay hydrated with this heat, a Starbucks iced tea sounds nice, right? Feels like ${body.current.feelslike}, but I doubt people can feel the difference, no pun intended. The humidity is ${body.current.humidity}, interesting.`)
            } else if (body.current.temperature > 80 && body.current.temperature < 89) {
                callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}, not to bad, can probably still go out for a walk. Feels like ${body.current.feelslike}, how do meteorologists know this? The humidity is ${body.current.humidity}, not to bad.`)
            } else if (body.current.temperature > 70 && body.current.temperature < 79) {
                callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}, perfect weather, like Bay Area weather. Feels like ${body.current.feelslike}, doesn't really make a difference. The humidity is ${body.current.humidity}, nor does it here.`)
            } else if (body.current.temperature > 60 && body.current.temperature < 69) {
                callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}, a little cold, should probably wear a sweater. Feels like ${body.current.feelslike}, or maybe a hoodie. The humidity is ${body.current.humidity}, as expected.`)
            } else if (body.current.temperature > 50 && body.current.temperature < 59) {
                callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}, it's cold, should probably wear a jacket. Feels like ${body.current.feelslike}, and with thick socks. The humidity is ${body.current.humidity}, in case you were wondering.`)
            } else if (body.current.temperature > 40 && body.current.temperature < 49) {
                callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}, it's pretty cold, turn the heater on. Feels like ${body.current.feelslike}, don't go out for too long. The humidity is ${body.current.humidity}, probably not needed.`)
            } else if (body.current.temperature > 30 && body.current.temperature < 39) {
                callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}, it's really cold, if you go out, take a Canada Goose jacket. Feels like ${body.current.feelslike}, be careful. The humidity is ${body.current.humidity}, can you tell?`)
            } else if (body.current.temperature > 20 && body.current.temperature < 29) {
                callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}, how can it be this cold, where do you live? Feels like ${body.current.feelslike}, try not to go out. The humidity is ${body.current.humidity}, nice right?`)
            } else if (body.current.temperature > 10 && body.current.temperature < 19) {
                callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}, stay home! Feels like ${body.current.feelslike}, turn heater to full capacity! The humidity is ${body.current.humidity}, doesn't matter though.`)
            } else {
                callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}, are you in the artic??? Feels like ${body.current.feelslike}, turn heater to full capacity, and wear a sweater!!! The humidity is ${body.current.humidity}, but you have bigger worries!!!`)
            }
        }
    })
}

module.exports = forecast