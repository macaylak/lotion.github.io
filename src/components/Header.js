// Header.js

import React, { useRef } from 'react';

const Header = ({ SidebarRef, NoteRef }) => { // receive refs as props
  const handleMenuClick = () => {
    const sidebar = SidebarRef.current;
    const Note = NoteRef.current;
    if (sidebar && Note) {
      sidebar.classList.toggle('hide-sidebar');
      Note.classList.toggle('full-width');
    }
  };

  return (
    <header>
      <div id="menu" onClick={handleMenuClick}>
        <span>&#9776;</span>
      </div>
      <h1>Lotion</h1>
      <h2>Like Notion, but worse.</h2>
    </header>
  );
}

export default Header;
