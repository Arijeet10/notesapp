import express from 'express';
import { register,login,verify, logout } from '../controllers/auth';

const router=express.Router();


router.post('/register',register);
router.post('/login',login);
router.get('/verify/:token',verify);
router.get('/logout',logout);


export default router;