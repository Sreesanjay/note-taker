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
exports.deleteNote = exports.updateNote = exports.getNotes = exports.createNote = void 0;
const notesModel_1 = __importDefault(require("../model/notesModel"));
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const newNote = yield new notesModel_1.default(Object.assign(Object.assign({}, req.body), { user_id })).save();
        if (newNote) {
            res.status(201).json({
                success: true,
                message: 'New note added',
                note: newNote
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
exports.createNote = createNote;
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
        const notes = yield notesModel_1.default.find({ user_id: user_id, is_deleted: false }).sort({ updatedAt: -1 });
        if (notes) {
            res.status(200).json({
                success: true,
                message: 'notes fetched',
                notes
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
exports.getNotes = getNotes;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield notesModel_1.default.findOneAndUpdate({ _id: req.params.id }, { $set: Object.assign({}, req.body) }, { new: true });
        if (note) {
            res.status(201).json({
                success: true,
                message: 'Note updated',
                note
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
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield notesModel_1.default.findOneAndUpdate({ _id: req.params.id }, { $set: { is_deleted: true } }, { new: true });
        if (note) {
            res.status(201).json({
                success: true,
                message: 'Note deleted',
                note
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
exports.deleteNote = deleteNote;
