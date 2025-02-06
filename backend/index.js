
import express from 'express';
const app = express();
import dotenv from 'dotenv';
import AuthRoutes from './routes/auth.js';
import NoteRoutes from './routes/notes.js';
import DbCon from './utils/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();

// mongoose connection
DbCon();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(express.json());
app.use("/auth", AuthRoutes);

app.use('/notes', NoteRoutes);



app.get('/', (req, res) => {
    res.send('Welcome to the Note Taking Web App!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on:${port}`);
});

