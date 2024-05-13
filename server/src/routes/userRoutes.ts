import express from 'express';
import { register,login,verify, logout } from '../controllers/auth';
import { corsOptions } from '../index';
import cors from "cors";
const router=express.Router();


router.post('/register',cors(corsOptions),register);
router.post('/login',cors(corsOptions),login);
router.get('/verify/:token',cors(corsOptions),verify);
router.get('/logout',cors(corsOptions),logout);


export default router;