import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, showAlert } = context;
  const [note, setNote] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etag: "",
    eprice:"",
  });

  useEffect(() => {
    
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else {
      navigate("/login");  
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const closeref = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      eid: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      eprice:currentNote.price,
    });
  };

  const handelClick = (e) => {
    editNote(note.eid, note.etitle, note.edescription, note.etag,note.eprice);
    closeref.current.click();
    showAlert("Your Product details is successfully updated", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
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
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Product Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body "></div>
            <form className="container">
              <div className="mb-3 ">
                <label htmlFor="etitle" className="form-label">
                Product Name
                </label>
                <input
                  type="text"
                  value={note.etitle}
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  aria-describedby="emailHelp"
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                Product Description
                </label>
                <input
                  type="text"
                  value={note.edescription}
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">
                Product Category
                </label>
                <input
                  type="text"
                  value={note.etag}
                  className="form-control"
                  id="etag"
                  name="etag"
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="eprice" className="form-label">
                Price
                </label>
                <input
                  type="text"
                  value={note.eprice}
                  className="form-control"
                  id="eprice"
                  name="eprice"
                  onChange={onChange}
                />
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeref}
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 ||
                  note.edescription.length < 5 ||
                  note.etag.length < 3
                }
                onClick={handelClick}
                type="button"
                className="btn btn-primary"
              >
                Update changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container  my-3">
        <h3>Your Products</h3>
        
        {notes.length === 0 && "No notes to display"}
        
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
