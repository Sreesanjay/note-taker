import { Request, Response } from "express";
import Note from "../model/notesModel"

export const createNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const user_id = req.user?._id;
        const newNote = await new Note({
            ...req.body,
            user_id
        }).save()
        if (newNote) {
            res.status(201).json({
                success: true,
                message: 'New note added',
                note: newNote
            })
        }
    } catch (err) {
        res.status(500).json({
            error: true,
            message: 'Internal Server Error'
        })
    }
}
export const getNotes = async (req: Request, res: Response): Promise<void> => {
    try {
        const user_id = req.user?._id;
        const notes = await Note.find({ user_id: user_id, is_deleted: false }).sort({ updatedAt: -1 });
        if (notes) {
            res.status(200).json({
                success: true,
                message: 'notes fetched',
                notes
            })
        }
    } catch (err) {
        res.status(500).json({
            error: true,
            message: 'Internal Server Error'
        })
    }
}
export const updateNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const note = await Note.findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body } }, { new: true })
        if (note) {
            res.status(201).json({
                success: true,
                message: 'Note updated',
                note
            })
        }
    } catch (err) {
        res.status(500).json({
            error: true,
            message: 'Internal Server Error'
        })
    }
}
export const deleteNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const note = await Note.findOneAndUpdate({ _id: req.params.id }, { $set: { is_deleted: true } }, { new: true })
        if (note) {
            res.status(201).json({
                success: true,
                message: 'Note deleted',
                note
            })
        }
    } catch (err) {
        res.status(500).json({
            error: true,
            message: 'Internal Server Error'
        })
    }
}