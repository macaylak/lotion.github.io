import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Note = ({ activeNote, onUpdateNote, onDeleteNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formatDate = (when) => {
    const date = new Date(when);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const time = date.toLocaleTimeString("en-US", options);
    return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}, ${time}`;
  };

  useEffect(() => {
    if (activeNote) {
      const formattedDate = formatDate(activeNote.lastModified);
      setFormattedDate(formattedDate);
    }
  }, [activeNote]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    const answer = window.confirm("Are you sure you want to delete this note?");
    if (answer) {
      onDeleteNote(activeNote.id);
    }
  };

  const formats = [
    "size",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "script",
  ];
  
if (!activeNote) {
  return (
    <div className="app-main">
      <div className="no-active-note">Select a note or create a new one</div>
    </div>
  );
}

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <div className="buttons">
          {isEditing ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
        <input
          type="text"
          id="title"
          placeholder="Untitled"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
          disabled={!isEditing}
        />
        {formattedDate && <div className="formatted-date">{formattedDate}</div>}
        <div className="toolbar">
        <ReactQuill
          value={activeNote.body}
          onChange={(value) => onEditField("body", value)}
          modules={{
            toolbar: {
              container: [
                  [{ size: [] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ script: "sub" }, { script: "super" }],
                ],
              },
            }}
            formats={formats}
            readOnly={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default Note;
