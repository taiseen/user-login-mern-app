import { userLogin, userRegistration } from '../controller/userController.js'
import express from 'express'

const router = express.Router();


router.post('/signin', userLogin);
router.post('/signup', userRegistration);


export default router;