import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/Notes/NoteContext";
import Noteitem from "./Noteitem";
import Alert from "./Alert";
import "./css/notes.css";
import "./css/home.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  let navigate = useNavigate();
  const { notes, getallNotes, editNote } = useContext(noteContext);
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/login")
    }else{
      getallNotes();
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({e_id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  };

  const ref = useRef(null);
  const refClose = useRef(null);


  const handleSubmit = (e) =>{
    editNote(note.e_id, note.etitle, note.edescription, note.etag);
    toast.success("Note has been updated successfully.")
    refClose.current.click();
    window.scrollBy(0,9999);
  }

  const [note, setNote] = useState({
    e_id: "",
    etitle: "",
    edescription: "",
    etag: "",
  })

  const handleChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value});
  }

  return (
    <>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog text-light">
          <div className="modal-content text-light bg-dark">
            <div className="modal-header text-light">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {" "}
              <form className="form">
                <div className="form-group group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    value={note.etitle}
                    id="etitle"
                    name="etitle"
                    minLength={5}
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="edescription"
                    value={note.edescription}
                    id="edescription"
                    rows="10"
                    cols="50"
                    minLength={5}
                    required=""
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="form-group group">
                  <label htmlFor="tag">
                    Tag <span>( Please enter only one tag! )</span>
                  </label>
                  <input
                    type="tag"
                    value={note.etag}
                    id="etag"
                    name="etag"
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleSubmit}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container-fluid m-0 px-5 py-5"
        style={{ backgroundColor: "#212529", color: "#fff" }}
      >
        <div className="mynotes mt-0">
          <div className="d-flex justify-content-between">
            <h4 className="mb-4">Your Notes</h4>
            {props.flag && <Alert />}
          </div>

          <div className="noteitem d-flex flex-wrap flex-row justify-content-start align-items-center gap-5">
            {notes.length===0 && <h6>No notes here..!</h6>}
            {notes.map((note) => {
              return (
                <Noteitem key={note._id} updateNote={updateNote} note={note} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
