import { Router } from "express";
const router: Router = Router();
import { signup, signin } from "../controller/userController"
import { protect } from "../middlewares/authMiddleware";
import notesRoute from "./notesRoute";

router.post('/signup', signup)
router.post('/signin', signin)
router.use('/notes', protect, notesRoute)

export default router;