import React,{ useContext } from "react";
import noteContext from "../context/notes/noteContext";


const NoteItem = (props) => {
  const { note ,updateNote} = props;
  const context = useContext(noteContext);
  const {deleteNote,showAlert} =context; 
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{
              updateNote(note)
            }}></i>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{
              deleteNote(note._id);
              showAlert("Sucessfully Deleted","danger")
            }}></i>
          </div>
          <p className="card-text my-0">D: {note.description} </p>
          <p className="card-text my-0">C: {note.tag} </p>
          <p className="card-text my-0">Rs: {note.price} </p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
