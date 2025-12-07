import Note from "../models/Note.js";

// Create note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content, user: req.user._id });
    res
      .status(201)
      .json({ message: "Note Created Succesfully", title: note.title });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create note", error: error.message });
  }
};

// Get all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch notes", error: error.message });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Find note and verify ownership
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check if note belongs to logged-in user
    if (note.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this note" });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.status(200).json({ message: "Note Updated Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update note", error: error.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check if note belongs to logged-in user
    if (note.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this note" });
    }

    await Note.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ message: "Note deleted successfully", title: note.title });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete note", error: error.message });
  }
};
