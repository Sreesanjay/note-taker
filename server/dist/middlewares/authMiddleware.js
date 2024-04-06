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
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const validateEnv_1 = __importDefault(require("../util/validateEnv"));
const mongoose_1 = __importDefault(require("mongoose"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, validateEnv_1.default.JWT_ACCESSTOKEN_SECRET);
            const userId = new mongoose_1.default.Types.ObjectId(decoded.id);
            const user = yield userModel_1.default.findById({ _id: userId });
            if (!user) {
                res.status(401).json({ error: true, message: 'Unauthorized user' });
            }
            else {
                req.user = user;
            }
            next();
        }
        else {
            res.status(401).json({ error: true, message: 'Unauthorized user' });
        }
    }
    catch (err) {
        if (typeof err === 'object' && err !== null && 'message' in err) {
            res.status(401);
            res.status(401).json({ error: true, message: 'Unauthorized user' });
        }
        else {
            res.status(500).json({ error: true, message: 'Internal server error' });
        }
    }
});
exports.protect = protect;
