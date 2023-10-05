"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
//Database Connection
mongoose_1.default.connect(DATABASE_URL);
//Connection Events
mongoose_1.default.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));
//Models
const PoemSchema = new mongoose_1.default.Schema({
    author: String,
    title: String,
    poem: String,
});
const Poem = mongoose_1.default.model("Poem", PoemSchema);
//Middleware
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
//Routes
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
//Poem Index Route
app.get("/poems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // send all poems
        res.json(yield Poem.find({}));
    }
    catch (error) {
        //send error
        res.status(400).json(error);
    }
}));
app.post("/poems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield Poem.create(req.body));
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
