const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
require("./db/db.config")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const PORT = 8000

const Customer = require("./routes/customerRoutes")
app.use(Customer)

app.listen(PORT, () => {
  console.log("Server is running on", PORT)
})
