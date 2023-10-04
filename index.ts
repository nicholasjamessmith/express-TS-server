//Dependencies
require("dotenv").config()
const { PORT = 3000 } = process.env;
import express from "express"
const app = express()

//Routes
app.get("/", (req, res) => {
  res.send("Hello, World!")
})

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));