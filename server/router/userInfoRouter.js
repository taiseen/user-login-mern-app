import { getUserInfo, userInfoUpdate, userInfoDelete } from '../controller/userInfoController.js'
import userAuth from '../middleware/userAuth.js';
import express from 'express'

const router = express.Router();


router.get('/', userAuth, getUserInfo);

router.patch('/', userAuth, userInfoUpdate);

router.delete('/', userAuth, userInfoDelete);


export default router;