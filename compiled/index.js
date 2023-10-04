"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Dependencies
require("dotenv").config();
const { PORT = 3000, DATABASE_URL } = process.env;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
//Database Connection
mongoose_1.default.connect(DATABASE_URL);
//Connection Events
mongoose_1.default.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));
//Routes
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
