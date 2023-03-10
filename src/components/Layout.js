
// Layout.js 

import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Note from "./Note";

function Layout(props) {
  return (
    <>
      <Header />
      <div className="container">
        <Sidebar
          notes={props.notes}
          onAddNote={props.onAddNote}
          onDeleteNote={props.onDeleteNote}
          activeNote={props.activeNote}
          setActiveNote={props.setActiveNote}
        />
        {props.activeNote ? (
          <Note activeNote={props.activeNote} onUpdateNote={props.onUpdateNote} />
        ) : (
          <div className="no-active-note">Select a note or create a new one</div>
        )}
      </div>
    </>
  );
}

export default Layout;