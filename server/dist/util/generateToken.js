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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateEnv_1 = __importDefault(require("./validateEnv"));
const ACCESSTOKEN_MAX_AGE = 3 * 24 * 60 * 60;
const generateToken = (email, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = jsonwebtoken_1.default.sign({ email, id }, validateEnv_1.default.JWT_ACCESSTOKEN_SECRET, { expiresIn: ACCESSTOKEN_MAX_AGE });
        if (accessToken) {
            return Promise.resolve(accessToken);
        }
        else {
            return Promise.reject(new Error('Could not generate token'));
        }
    }
    catch (error) {
        return Promise.reject(error);
    }
});
exports.default = generateToken;
