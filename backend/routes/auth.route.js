import express from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/signOut', authController.signOut);
router.post('/google', authController.googleSignIn);

export default router;