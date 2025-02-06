import NoteModel from '../models/notes.js'; // Import the Note model
import mongoose from 'mongoose';

export const create = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.userId) {
      console.error("Error: User ID is missing in request");
      return res.status(400).json({ success: false, message: "User ID is missing" });
    }

    // Create a new note
    const newNote = new NoteModel({
      title,
      content,
      userId: req.userId, // Ensure userId is properly assigned
    });

    await newNote.save();
    res.status(201).json({ success: true, message: "Note created successfully", note: newNote });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const UpdateNote = async (req, res) => {
  try {
    const userId = req.userId; // Get userId from the request (assumed to be set by middleware)
    const { id } = req.params; // Get note ID from URL params
    const { title, content } = req.body; // Get updated title and content from request body

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required" });
    }

    // Find the note by ID
    const note = await NoteModel.findById(id);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    // Check if the user is authorized to update the note
    if (note.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "You are not authorized to update this note" });
    }

    // Update the note
    const updatedNote = await NoteModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } // Return the updated note
    );

    res.status(200).json({ success: true, message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const DeleteNote = async (req, res) => {
try{
    const userId = req.userId; // Get userId from the request (assumed to be set by middleware)
    const { id } = req.params; // Get note ID from URL params

    // Find the note by ID
    const note = await NoteModel.findById(id);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
   
    const deletedNote = await NoteModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Note deleted successfully", note: deletedNote });


  }catch(error){
  
    // Check if the user is authorized to delete the note
    if (note.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "You are not authorized to delete this note" });
    }

}



}

export const GetNotes = async (req, res) => {
  try {
    const userId = req.userId; // Get userId from the request (assumed to be set by middleware)

    // Find notes by userId
    const notes = await NoteModel.find({ userId });
  if(!notes){
    return res.status(404).json({ success: false, message: "No notes found" });
  }
    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error("Error getting notes:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};