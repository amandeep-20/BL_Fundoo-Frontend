import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom"; // Added for grid/list view
import { NotesContext } from "../../context/NotesContext";
import NoteCard from "../NoteCard/NoteCard";
import {  Typography } from "@mui/material";
import "./Reminders.scss"; // Import the new SCSS file

export default function Reminders() {
  const { isGridView } = useOutletContext(); // Get grid/list view state
  const { notesList, setNotesList } = useContext(NotesContext);

  // Filter notes that have a reminder set and are not in the trash
  const reminderNotes = notesList.filter(
    (note) =>
      note.reminder &&
      !isNaN(new Date(note.reminder).getTime()) && // Ensure reminder is a valid date
      !note.isDeleted
  );

  // Function to update the notes list (passed to NoteCard)
  const updateList = ({ action, data }) => {
    if (action === "update") {
      const updatedNotes = notesList.map((note) =>
        note.id === data.id ? data : note
      );
      setNotesList(updatedNotes);
    } else if (action === "delete") {
      const updatedNotes = notesList.filter((note) => note.id !== data.id);
      setNotesList(updatedNotes);
    } else if (action === "archive" || action === "unarchive") {
      const updatedNotes = notesList.map((note) =>
        note.id === data.id ? { ...note, isArchived: data.isArchived } : note
      );
      setNotesList(updatedNotes);
    } else if (action === "color") {
      const updatedNotes = notesList.map((note) =>
        note.id === data.id ? { ...note, color: data.color } : note
      );
      setNotesList(updatedNotes);
    }
  };

  return (
    <div className={`reminders-container ${isGridView ? 'grid-view' : 'list-view'}`}>
      {reminderNotes.length > 0 ? (
        <div className="notes-list">
          {reminderNotes.map((note) => (
            <NoteCard
              key={note.id}
              noteDetails={note}
              updateList={updateList}
              isTrash={false} // Since these are active reminders, not in trash
            />
          ))}
        </div>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No reminders set.
        </Typography>
      )}
    </div>
  );
}