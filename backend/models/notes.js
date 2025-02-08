import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
}
});

const Note = mongoose.model("Note", NoteSchema);

export default Note;
