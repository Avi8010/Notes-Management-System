import React, { useContext, useState } from "react";
import noteContext from "./context/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addnote}= context;

    const [note, setnote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addnote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:""})
        props.showalert("Note added successfully","success")
    }
    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <h1>Add a note</h1>
      <form>
        <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          
        </div>
        <div className="mb-3 ">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
          />
        </div>
        <div className="mb-3 ">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
