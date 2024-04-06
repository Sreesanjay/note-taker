"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const corsConfig = {
    origin: validateEnv_1.default.NODE_ENV === "development" ? validateEnv_1.default.DEV_ORIGIN : validateEnv_1.default.DEP_ORIGIN,
    credentials: true,
};
if (validateEnv_1.default.NODE_ENV === "development") {
    app.use((0, morgan_1.default)('dev'));
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsConfig));
app.use('/api', index_1.default);
exports.default = app;
