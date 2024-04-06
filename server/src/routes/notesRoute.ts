import { Router } from "express";
import { createNote, deleteNote, getNotes, updateNote } from "../controller/notesController";
import { protect } from "../middlewares/authMiddleware";
const router: Router = Router();

router.post('/', protect, createNote)
router.get('/', protect, getNotes)
router.put('/:id', protect, updateNote)
router.delete('/:id', protect, deleteNote)

export default router;