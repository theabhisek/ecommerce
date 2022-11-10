const express = require('express')
const cookieParser = require('cookie-parser')
const app  = express();
const errorMiddleware = require('./middleware/error')
app.use(express.json())
app.use(cookieParser())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute")
app.use("/api/v1",product)
app.use("/api/v1",user)


//middleware  for Errors
app.use(errorMiddleware)

module.exports = app