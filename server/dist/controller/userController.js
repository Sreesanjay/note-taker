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
exports.signin = exports.signup = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../util/generateToken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: true,
                message: 'email or password missing'
            });
        }
        const exist = yield userModel_1.default.findOne({ email: email });
        if (exist) {
            return res.status(400).json({
                error: true,
                message: 'email already exist'
            });
        }
        const newUser = yield new userModel_1.default({ email, password }).save();
        if (newUser) {
            const token = yield (0, generateToken_1.default)(newUser.email, newUser._id);
            delete newUser.password;
            return res.status(201).json({
                success: true,
                message: 'user registered successfully',
                user: newUser,
                token: token
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: true,
            message: 'Internal Server Error'
        });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: true,
                message: 'email or password not found'
            });
        }
        const user = yield userModel_1.default.findOne({ email: email });
        if (!user) {
            res.status(409);
            return res.json({
                error: true,
                message: 'user or password not match'
            });
        }
        const match = yield bcryptjs_1.default.compare(password, user.password);
        if (match) {
            const accessToken = yield (0, generateToken_1.default)(user.email, user._id);
            const userObj = user.toObject();
            delete userObj.password;
            res.status(201).json({
                success: true,
                message: "User loged in successfully",
                user: userObj,
                token: accessToken,
            });
        }
        else {
            res.status(401);
            return res.json({
                error: true,
                message: 'user or password not match'
            });
        }
    }
    catch (err) {
        return res.json({
            error: true,
            message: 'Internal Server Error'
        });
    }
});
exports.signin = signin;
