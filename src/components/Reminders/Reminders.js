import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { NotesContext } from "../../context/NotesContext";
import NoteCard from "../NoteCard/NoteCard";
import {  Typography } from "@mui/material";
import "./Reminders.scss"; 

export default function Reminders() {
  const { isGridView } = useOutletContext();
  const { notesList, setNotesList } = useContext(NotesContext);

  const reminderNotes = notesList.filter(
    (note) =>
      note.reminder &&
      !isNaN(new Date(note.reminder).getTime()) && 
      !note.isDeleted
  );

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
              isTrash={false} 
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