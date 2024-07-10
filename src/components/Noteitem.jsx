import React, { useContext } from "react";
import "./css/noteitem.css";
import noteContext from "../context/Notes/NoteContext";

function Noteitem(props) {
  const { note, updateNote } = props;
  const {deleteNote} = useContext(noteContext)
  return (
    <div className="card" style={{ textAlign: "start" }}>
      <h3>{note.title}</h3>
      <p className="p-1" style={{fontSize: "15px", fontWeight: "lighter"}}>
        {note.description}
      </p>
      <div className="btns d-flex justify-content-between px-2 pb-2">
        <button className="Btn">
          <span className="svgContainer">
            <i className="bi bi-pencil-square" onClick={()=>{updateNote(note)}}></i>
          </span>
          <span className="BG"></span>
        </button>
        <button className="Btn">
          <span className="svgContainer">
          <i className="bi bi-trash3" style={{color: "red"}} onClick={()=>{deleteNote(note._id)}}></i>
          </span>
          <span className="BG"></span>
        </button>
      </div>
      <span className="mt-auto">{note.date}</span>
    </div>
  );
}

export default Noteitem;
