import React, { useState } from "react";
import noteContext from "./NoteContext";
import { toast } from "react-toastify";

const NoteState = (props)=>{
  const host = "http://localhost:5000";
    const initialNotes = [];

      const [notes, setNotes] = useState(initialNotes);

      const getallNotes=async()=>{
        try {
          const response = await fetch(`${host}/api/notes/getNotes`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token'),
            },
          });
          const json = await response.json();
          console.log(json);
          setNotes(json);
          
        } catch (error) {
          console.error("Error in getNote try block");
        }
      }

      const addNote=async(title, description, tag)=>{

        try {
          const response = await fetch(`${host}/api/notes/addNotes`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({title, description, tag})
          });
          const json = await response.json();
          console.log(json)
          
        } catch (error) {
          console.error("Error in addNote try block");
        }

        const date = Date.now();
        const note = {
          "_id": "66800edt7470981537a771dz",
          "user": "667b8c846ace7df73b25bb24",
          "title": title,
          "description": description,
          "tag": tag,
          "date": date,
          "__v": 0
        }

        setNotes(notes.concat(note))
      }

      const deleteNote = async(id) =>{
        try {
          const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token'),
            }
          });
          toast.success("Note has been deleted!")
          getallNotes();
          const json = await response.json();
          console.log(json) 
        } catch (error) {
          console.error("Error in deleteNote try block");
        }


        console.log("Note: "+id);
        const newNotes = notes.filter((note)=>{return note._id !== id});
        setNotes(newNotes);
      }
      
      const editNote = async(id, title, description, tag) =>{

        try {
          const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({id, title, description, tag})
          });
          const json = await response.json();
          console.log(json)
          
        } catch (error) {
          console.error("Error in editNote try block");
        }

        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
      }
    return(
        <noteContext.Provider value={{notes, getallNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;