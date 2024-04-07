import { Request, Response } from "express";
import Note from "../model/notesModel"
import { ObjectId } from "mongodb"
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
        const user_id = new ObjectId(req.user?._id);
        console.log(user_id)
        const search = req.query.search;
        const notes = await Note.aggregate([
            {
                $match: {
                    user_id: user_id,
                    is_deleted: false
                }
            },
            {
                $sort: {
                    isPinned: -1,
                    updatedAt: -1
                }
            }
        ]);
        if (notes) {
            const afterSearch = notes?.filter((item) => {
                return search === ""
                    ? item
                    : item.title
                        .toLowerCase()
                        .includes(search as string) || item.note.toLowerCase().includes(search as string)
            })
            res.status(200).json({
                success: true,
                message: 'notes fetched',
                notes: afterSearch
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