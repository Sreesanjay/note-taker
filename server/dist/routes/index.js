"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const userController_1 = require("../controller/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const notesRoute_1 = __importDefault(require("./notesRoute"));
router.post('/signup', userController_1.signup);
router.post('/signin', userController_1.signin);
router.use('/notes', authMiddleware_1.protect, notesRoute_1.default);
exports.default = router;
