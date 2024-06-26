"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const validateEnv_1 = __importDefault(require("./util/validateEnv"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(validateEnv_1.default.MONGO_CONNECTION_STRING).then(() => {
    console.log("connected to db");
    app_1.default.listen(validateEnv_1.default.PORT, () => console.log('connected to port ' + validateEnv_1.default.PORT));
});
