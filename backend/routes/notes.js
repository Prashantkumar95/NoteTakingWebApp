import express from 'express';
import { create, UpdateNote,DeleteNote,GetNotes } from '../controllers/Notes.js';   
import { verificationToken } from '../mddleware/verificationtoken.js';

const NotesRoutes = express.Router();

// Route to create a note, with token verification
NotesRoutes.post('/createnote', verificationToken, create);

// Route to update a note by ID
NotesRoutes.put('/updatenote/:id',verificationToken, UpdateNote);

// routes to delete a note by ID
NotesRoutes.delete('/deletenote/:id',verificationToken, DeleteNote);

// routes to get all notes
NotesRoutes.get('/getnotes',verificationToken, GetNotes);
export default NotesRoutes;
