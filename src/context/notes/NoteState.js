import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const initialvalue = [];
  const [notes, setNotes] = useState(initialvalue);

  //Get all notes
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fatchusernotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    
    const json = await response.json();
    setNotes(json);
  };

  // Add a note

  const addNote = async ({ title, description, tag, price }) => {
    // API call
    const response = await fetch(`${host}/api/notes/createnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag, price}),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async(id) => {
    // API call

    const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async ( id, title, description, tag, price) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ id, title, description, tag, price}),
    });
    const json = await response.json();
    console.log(json);

    let newNnotes= JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < notes.length; i++) {
      if (newNnotes[i]._id === id) {
        newNnotes[i].title = title;
        newNnotes[i].description = description;
        newNnotes[i].tag = tag;
        newNnotes[i].price = price;
        break;
      }
    }
    setNotes(newNnotes);
  };

 // showing alert
  const [alert,setAlert]=useState(null);

  const showAlert=(message,type)=>{
    setAlert({
      message:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes,alert, showAlert}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
