import React, { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"; // Added to get context
import Masonry from "react-masonry-css";
import NoteCard from "../NoteCard/NoteCard";
import { NotesContext } from "../../context/NotesContext";
import "./TrashContainer.scss";

const TrashContainer = () => {
  const { isGridView } = useOutletContext(); // Get isGridView from Outlet context
  const { setNotesList, filteredNotes } = useContext(NotesContext);
  const trashNotes = filteredNotes.filter((note) => note.isDeleted);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 900);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTrashList = ({ action, data }) => {
    if (action === "restore") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, ...data } : note
        )
      );
    } else if (action === "delete") {
      setNotesList((prevNotes) =>
        prevNotes.filter((note) => note.id !== data.id)
      );
    }
  };

  const breakpointCols = {
    default: 4,
    1200: 3,
  };

  return (
    <div className={`trash-container ${isGridView ? 'grid-view' : 'list-view'}`}>
      <div className="notes-list">
        {trashNotes.length > 0 ? (
          isLargeScreen && isGridView ? (
            <Masonry
              breakpointCols={breakpointCols}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {trashNotes.map((note) => (
                <div key={note.id}>
                  <NoteCard
                    noteDetails={note}
                    updateList={handleTrashList}
                    isTrash
                  />
                </div>
              ))}
            </Masonry>
          ) : (
            trashNotes.map((note) => (
              <NoteCard
                key={note.id}
                noteDetails={note}
                updateList={handleTrashList}
                isTrash
              />
            ))
          )
        ) : (
          <p>No notes in Trash.</p>
        )}
      </div>
    </div>
  );
};

export default TrashContainer;