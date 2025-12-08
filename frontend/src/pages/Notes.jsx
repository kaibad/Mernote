import API from "#services/api";
import { Pencil, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchNote = async () => {
    try {
      const res = await API.get("/api/notes");
      setNotes(res.data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  // Unified submit handler for both create and update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Title and content are required");
      return;
    }

    try {
      if (editingId) {
        // Update existing note
        await API.put(`/api/notes/${editingId}`, { title, content });
      } else {
        // Create new note
        await API.post("/api/notes", { title, content });
      }
      setTitle("");
      setContent("");
      setEditingId(null);
      fetchNote();
    } catch (error) {
      console.error("Failed to save note:", error);
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await API.delete(`/api/notes/${id}`);
        fetchNote();
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    }
  };

  // Edit note - populate form with note data
  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel edit
  const cancelEdit = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  useEffect(() => {
    fetchNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="p-5 max-w-4xl mx-auto">
      <form className="site-form" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-white">
          {editingId ? "Edit Note" : "Create New Note"}
        </h2>

        <label className="floating-label">
          <input
            type="text"
            className="input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <span>Title</span>
        </label>

        <label className="floating-label">
          <textarea
            className="textarea"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <span>Content</span>
        </label>

        <div className="flex gap-2">
          <button type="submit" className="btn btn-soft btn-accent">
            {editingId ? "Update Note" : "Add Note"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="btn btn-soft bg-gray-600 hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-white">
          Your Notes ({notes.length})
        </h2>
        {notes.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No notes yet. Create your first note above!
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="flex flex-wrap justify-between items-center bg-gray-800 p-4 mb-3 rounded-lg"
            >
              <div className="notes-content-wrapper">
                <h3 className="font-bold text-lg text-white mb-2">
                  {note.title}
                </h3>
                <p className="text-gray-300 mb-3">{note.content}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Pencil
                  onClick={() => editNote(note)}
                  size={18}
                  className="text-white cursor-pointer hover:text-green-400 transition"
                />
                <X
                  onClick={() => deleteNote(note._id)}
                  size={18}
                  className="text-white cursor-pointer hover:text-red-400 transition"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Notes;
