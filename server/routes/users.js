import express from "express";

const router = express.Router();
import { signin, signup, editProfile } from "../controllers/user.js";


router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/:id', editProfile)

 
export default router;