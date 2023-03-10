import React from "react";
import "../index.css";

const Sidebar = ({ notes, onAddNote, activeNote, setActiveNote }) => {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  const handleNoteClick = (id) => {
    setActiveNote(id);
  };

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={onAddNote}>+</button>
      </div>
      {sortedNotes.length === 0 ? (
        <div className="no-notes">No Note Yet</div>
      ) : (
        <div className="app-sidebar-notes">
          {sortedNotes.map(({ id, lastModified, title, body }, i) => (
            <div
              key={id}
              className={`app-sidebar-note ${id === activeNote ? "active" : ""}`}
              onClick={() => handleNoteClick(id)}
            >
              <div className="sidebar-note-title">
                <strong>{title}</strong>
              </div>
              <small className="note-meta">
                {new Date(lastModified).toLocaleDateString("en-GB", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </small>
              <div
                className="sidebar-note-body"
                dangerouslySetInnerHTML={{
                  __html: body ? `${body.substr(0, 50)}${body.length > 100 ? "..." : ""}` : "..."
                }}
              ></div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
