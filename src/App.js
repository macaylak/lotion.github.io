// App.js

import React from 'react';
import { useEffect, useState, useRef } from "react"; // add useRef import
import uuid from "react-uuid";
import "./index.css";
import Note from "./components/Note";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);
  const SidebarRef = useRef(null); // create SidebarRef
  const NoteRef = useRef(null); // create NoteRef

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };


  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  return (
    <div className="App">
      <Header SidebarRef={SidebarRef} NoteRef={NoteRef} /> // pass refs as props
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        SidebarRef={SidebarRef} // pass SidebarRef to Sidebar
      />
      <Note 
        activeNote={getActiveNote()} 
        onUpdateNote={onUpdateNote} 
        onDeleteNote={onDeleteNote}
        NoteRef={NoteRef} // pass NoteRef to Note
      />
    </div>
  );
}

export default App;
