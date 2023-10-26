import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', userController.test);
router.post('/update/:id', verifyUser, userController.updateUser);
router.delete('/delete/:id', verifyUser, userController.deleteUser);

export default router;