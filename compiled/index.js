"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Dependencies
require("dotenv").config();
const { PORT = 3000 } = process.env;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//Routes
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
