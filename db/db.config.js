const mongoose = require("mongoose")

mongoose.connect(
  "mongodb+srv://test:test@cluster0.tkrw6dg.mongodb.net/?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
)

const con = mongoose.connection

con.on("open", () => {
  console.log("DB connected")
})
