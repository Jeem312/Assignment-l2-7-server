"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const index_1 = require("./app/routes/index ");
const globalErrorHandler_1 = require("./middleWares/globalErrorHandler");
const notFound_1 = require("./middleWares/notFound");
const app = (0, express_1.default)();
// Vercel er jonno trust proxy
app.set("trust proxy", 1);
// CORS setup
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));
// Cookie parser
app.use((0, cookie_parser_1.default)());
// Body parsers
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api/v1", index_1.router);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Portfolio Server",
    });
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.notFoundHandler);
exports.default = app;
