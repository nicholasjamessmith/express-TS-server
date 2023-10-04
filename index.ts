//Dependencies
require("dotenv").config()
const { PORT = 3000, DATABASE_URL }:any = process.env;
import express, { Request, Response } from "express"
import mongoose from "mongoose";
const app = express()



//Database Connection
mongoose.connect(DATABASE_URL);
//Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

//Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!")
})

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));