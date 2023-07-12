import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote, showAlert } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "",price:"" });

  const handelClick = (e) => {
    e.preventDefault();
    addNote(note);
    setNote({ title: "", description: "", tag: "",price:""});
    showAlert("Your Product is Added Success", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h3> Add Products</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={note.title}
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Product Description
            </label>
            <input
              type="text"
              value={note.description}
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Product Category
            </label>
            <input
              type="text"
              className="form-control"
              value={note.tag}
              id="tag"
              name="tag"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="price"
              className="form-control"
              value={note.price}
              id="price"
              name="price"
              onChange={onChange}
            />
          </div>
          <button
            disabled={
              note.title.length < 5 ||
              note.description.length < 5 ||
              note.tag.length < 3
            }
            type="submit"
            className="btn btn-primary"
            onClick={handelClick}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
