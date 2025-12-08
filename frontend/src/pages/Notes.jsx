import API from "#services/api";
import React, { useEffect, useState } from "react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNote = async () => {
    try {
      const res = await API.get("/api/notes");
      setNotes(res.data);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  const addNote = async () => {
    try {
      await API.post("/api/notes", { title, content });
      setTitle("");
      setContent("");
      fetchNote();
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <section className="p-5">
      <div className="flex gap-2">
        <input
          type="text"
          className="bg-gray-700 p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="textarea"
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button className="btn btn-soft btn-accent" onClick={addNote}>
          Add Note
        </button>
      </div>
      <div className="mt-5">
        {notes.map((note) => (
          <div key={note._id} className="bg-gray-800 p-3 mb-3">
            <h3 className="font-bold">{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notes;
