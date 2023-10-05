//Dependencies
//require("dotenv").config()
import { config } from "dotenv";
config();
const { PORT = 3000, DATABASE_URL }:any = process.env;
import express, { Request, Response } from "express"
import mongoose from "mongoose";
const app = express()
import cors from "cors";
import morgan from "morgan";

//Database Connection
mongoose.connect(DATABASE_URL);

//Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

//Models
const PoemSchema = new mongoose.Schema({
  author: String,
  title: String,
  poem: String,
});

const Poem = mongoose.model("Poem", PoemSchema);

//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!")
})

//Poem Index Route
app.get("/poems", async (req, res) => {
  try {
    // send all poems
    res.json(await Poem.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

app.post("/poems", async (req, res) => {
  try {
    res.json(await Poem.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));