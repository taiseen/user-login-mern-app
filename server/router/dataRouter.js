import { getData } from '../controller/dataController.js'
import userAuth from '../middleware/userAuth.js';
import express from 'express'

const router = express.Router();


router.get('/', userAuth, getData);



export default router;