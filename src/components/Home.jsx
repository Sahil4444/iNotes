import React, { useContext, useState, useEffect } from "react";
import Notes from "./Notes";
import "./css/home.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import noteContext from "../context/Notes/NoteContext";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
    console.log(localStorage.getItem('token'))
     // eslint-disable-next-line
  }, []);
  const { addNote } = useContext(noteContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag, note.date);
    setNote({ title: "", description: "", tag: "" });
    toast.success("Not successfully added.");
    window.scrollBy(0, 9999);
  };

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
    date: "",
  });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      {!localStorage.getItem("token") ? (
        navigate("/login")
      ) : (
        <div
          className="container-fluid"
          style={{ backgroundColor: "#212529", color: "#fff" }}
        >
          <ToastContainer />
          <div
            className="home container d-flex justify-content-center p-4 rounded"
            style={{ backgroundColor: "#212529", color: "#fff", width: "50%" }}
          >
            <div className="form-container">
              <h3>Create Your Note</h3>
              <form className="form">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    minLength={5}
                    required=""
                    value={note.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    value={note.description}
                    rows="10"
                    cols="50"
                    minLength={5}
                    required=""
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="tag">
                    Tag <span>( Please enter only one tag! )</span>
                  </label>
                  <input
                    type="tag"
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="cssbuttons-io"
                  disabled={
                    note.title.length < 5 || note.description.length < 5
                  }
                  type="submit"
                  onClick={handleSubmit}
                >
                  <span>Add Note</span>
                </button>
              </form>
            </div>
          </div>
          <hr />
          <Notes />
          <hr />
          <Footer />
        </div>
      )}
    </>
  );
}

export default Home;
