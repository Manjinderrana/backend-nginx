"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./utils/logger"));
const db_1 = require("./customModules/db");
const user_route_1 = __importDefault(require("./routes/user.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.json({ message: "Backend Working" });
});
app.get('/health', (_req, res) => {
    res.json({ message: "this is node backend application" });
});
app.use(user_route_1.default);
const port = process.env.PORT || 8002;
(0, db_1.connectDB)()
    .then(() => {
    app.listen(port, () => {
        logger_1.default.info(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    logger_1.default.error(error, "Error connecting to database");
});
