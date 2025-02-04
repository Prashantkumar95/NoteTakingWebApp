import express from 'express';
import { Login, Logout, Register } from '../controllers/auth.js';
const AuthRoutes = express.Router();

AuthRoutes.post('/register', Register);
AuthRoutes.post('/login', Login);
AuthRoutes.post('/logout',Logout);




export default AuthRoutes;
