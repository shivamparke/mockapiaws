"use strict"

const jwtdecode = require('jwt-decode')

let express = require('express')
const jwtDecode = require("jwt-decode");
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()
let app = express()

app.use(express.static(pathToSwaggerUi))

console.log(pathToSwaggerUi)

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
/*app.use((request, response,
         nextAction) => {
    if (['https://editor.swagger.io', 'https://hoppscotch.io'].includes(request.headers.origin)) {
        response.header("Access-Control-Allow-Origin", request.headers.origin);
        response.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
    }
    nextAction();
})*/

app.listen(3000, '0.0.0.0')
console.log('Node.js Express server is running on port 3000...')

app.get('/v1/weather', get_weather)
app.get('/v1/hello', get_greeting)
app.post('/v1/auth', get_token)

let mockTokens = ["eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTaGl2YW0iLCJpYXQiOjE2NDQxNjg2MDcsImV4cCI6MTY0NDM0MTQwNywiYXVkIjoid3d3Lm9yZWdvbnN0YXRlLmVkdSIsInN1YiI6InNoaXZhbUBvcmVnb25zdGF0ZS5lZHUifQ.BNksseyWZGqruvamD29z9N8b3I_65vJubtHcLY3yN_Q",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTaGl2YW0iLCJpYXQiOjE2MTI1NTg1NTEsImV4cCI6MTYxMjY0NDk1MSwiYXVkIjoid3d3Lm9yZWdvbnN0YXRlLmVkdSIsInN1YiI6InNoaXZhbUBvcmVnb25zdGF0ZS5lZHUifQ.EorezPS0RTIDEfk2YkvcN6LfwHzp6PtI7V678-jVzes",
"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTaGl2YW0iLCJpYXQiOjE2NDYwMTM4MDgsImV4cCI6MTY3NzU0OTgwOCwiYXVkIjoid3d3Lm9yZWdvbnN0YXRlLmVkdSIsInN1YiI6InNoaXZhbUBvcmVnb25zdGF0ZS5lZHUifQ.cnfjuUYlMnHVmxiuZmyK4HAeK3mikjYTgy0mnGTzLTw"]
let currentMockToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTaGl2YW0iLCJpYXQiOjE2NDYwMTM4MDgsImV4cCI6MTY3NzU0OTgwOCwiYXVkIjoid3d3Lm9yZWdvbnN0YXRlLmVkdSIsInN1YiI6InNoaXZhbUBvcmVnb25zdGF0ZS5lZHUifQ.cnfjuUYlMnHVmxiuZmyK4HAeK3mikjYTgy0mnGTzLTw"
let decoded = jwtDecode(currentMockToken)
let mockTokenExpiry = decoded.exp




function get_weather(request, response) {
    if(!request.headers.authorization) {
        response.status(401)
        return response.send("Invalid token format!")
    } else if (request.headers.authorization.startsWith("Bearer ")) {
        let incomingToken = request.headers.authorization.substring(7, request.headers.authorization.length);
        let incomingTokenExp = jwtDecode(incomingToken).exp * 1000
        //console.log(incomingTokenExp)
        //console.log(new Date().getTime())
        if (mockTokens.includes(incomingToken) && incomingTokenExp >= new Date().getTime()) {
            response.json({
                "coord": {
                    "lon": -123.262,
                    "lat": 44.5646
                },
                "weather": [
                    {
                        "id": 802,
                        "main": "Clouds",
                        "description": "scattered clouds",
                        "icon": "03d"
                    }
                ],
                "base": "stations",
                "main": {
                    "temp": 45.14,
                    "feels_like": 43.48,
                    "temp_min": 37.87,
                    "temp_max": 56.34,
                    "pressure": 1020,
                    "humidity": 72,
                    "sea_level": 1020,
                    "grnd_level": 1012
                },
                "visibility": 10000,
                "wind": {
                    "speed": 3.74,
                    "deg": 24,
                    "gust": 5.93
                },
                "clouds": {
                    "all": 44
                },
                "dt": 1642373258,
                "sys": {
                    "type": 1,
                    "id": 5858,
                    "country": "US",
                    "sunrise": 1642347934,
                    "sunset": 1642381185
                },
                "timezone": -28800,
                "id": 5720727,
                "name": "Corvallis",
                "cod": 200
            })
        } else {
            return response.sendStatus(401)
        }
    }
    // else if (!request.headers.authorization.startsWith("Bearer ")) {
    //     // TEMPORARY WORKAROUND FOR SWAGGER 2.0
    //     // https://github.com/OAI/OpenAPI-Specification/issues/583
    //     let incomingToken = request.headers.authorization
    //     let incomingTokenExp = jwtDecode(incomingToken).exp * 1000
    //     if (mockTokens.includes(incomingToken) && incomingTokenExp >= new Date().getTime()) {
    //         response.json({
    //             "coord": {
    //                 "lon": -123.262,
    //                 "lat": 44.5646
    //             },
    //             "weather": [
    //                 {
    //                     "id": 802,
    //                     "main": "Clouds",
    //                     "description": "scattered clouds",
    //                     "icon": "03d"
    //                 }
    //             ],
    //             "base": "stations",
    //             "main": {
    //                 "temp": 45.14,
    //                 "feels_like": 43.48,
    //                 "temp_min": 37.87,
    //                 "temp_max": 56.34,
    //                 "pressure": 1020,
    //                 "humidity": 72,
    //                 "sea_level": 1020,
    //                 "grnd_level": 1012
    //             },
    //             "visibility": 10000,
    //             "wind": {
    //                 "speed": 3.74,
    //                 "deg": 24,
    //                 "gust": 5.93
    //             },
    //             "clouds": {
    //                 "all": 44
    //             },
    //             "dt": 1642373258,
    //             "sys": {
    //                 "type": 1,
    //                 "id": 5858,
    //                 "country": "US",
    //                 "sunrise": 1642347934,
    //                 "sunset": 1642381185
    //             },
    //             "timezone": -28800,
    //             "id": 5720727,
    //             "name": "Corvallis",
    //             "cod": 200
    //         })
    //     } else {
    //         return response.sendStatus(401)
    //     }
    // }
    else {
        response.status(401)
        return response.send("Invalid token format!")
    }
}

function get_greeting(request, response) {
    if(!request.headers.authorization) {
        response.status(400)
        return response.send("Invalid token format!")
    } else if (request.headers.authorization.startsWith("Bearer ")) {
        let incomingToken = request.headers.authorization.substring(7, request.headers.authorization.length);
        let incomingTokenExp = jwtDecode(incomingToken).exp * 1000
        if (mockTokens.includes(incomingToken) && incomingTokenExp >= (new Date().getTime())) {
            response.json({"greeting": "Hello, from Shivam"})
        } else {
            return response.sendStatus(401)
        }
    }
    // else if (!request.headers.authorization.startsWith("Bearer ")) {
    //     // TEMPORARY WORKAROUND FOR SWAGGER 2.0
    //     // https://github.com/OAI/OpenAPI-Specification/issues/583
    //     let incomingToken = request.headers.authorization
    //     let incomingTokenExp = jwtDecode(incomingToken).exp * 1000
    //     if (mockTokens.includes(incomingToken) && incomingTokenExp >= (new Date().getTime())) {
    //         response.json({"greeting": "Hello, from Shivam"})
    //     } else {
    //         return response.sendStatus(401)
    //     }
    // }
    else {
        response.status(400)
        return response.send("Invalid token format!")
    }
}

function get_token(request, response) {
    if (!('username' in request.body)) {
        return response.sendStatus(400)
    }
    if (!('password' in request.body)) {
        return response.sendStatus(400)
    }
    if ((request.body.password !== "abcd1234") || (request.body.username.toLowerCase() !== "shivam")) {
        return response.sendStatus(401)
    }
    response.status(200)

    //response.send(`${request.body.username} is logged in! Here is your mock token: ${mockToken}`)
    response.json({
        "access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJTaGl2YW0iLCJpYXQiOjE2NDYwMTM4MDgsImV4cCI6MTY3NzU0OTgwOCwiYXVkIjoid3d3Lm9yZWdvbnN0YXRlLmVkdSIsInN1YiI6InNoaXZhbUBvcmVnb25zdGF0ZS5lZHUifQ.cnfjuUYlMnHVmxiuZmyK4HAeK3mikjYTgy0mnGTzLTw",
        "expires": "2023-02-28T02:03:28.561Z"
    })
}
