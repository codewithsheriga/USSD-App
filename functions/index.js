const functions = require('firebase-functions')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/ussd', (req, res)=>{
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text
    } = req.body

    let response = ""

    if(text == ''){
        response = `CON welcome to the Menu
        1. Check My Account
        2. Check Phone
        `
    }
    else if(text == '1'){
        response = `CON Choose Account Information to view
        1. Account Number
        2. Account Balance
        `
    }
    else if(text == '2'){
        response = `END Your phone number is ${phoneNumber}`
    }
    else if( text == '1*1'){
        const accountNumber = 'AC100002348394939'

        response = `END Your account Number is ${accountNumber}`
    }
    else if ( text == '1*2'){
        const accountBalance = 'GHC 10,000'
        response  = `END Your account balance is ${accountBalance}`
    }

    res.set('Content-type: text/plain')
    res.send(response)
})

exports.newUssd = functions.https.onRequest(app)


