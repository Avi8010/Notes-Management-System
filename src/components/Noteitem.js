import React, { useContext } from "react";
import noteContext from "./context/noteContext";


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deletenote}=context;
  const { note,updateNote} = props;
  return (
    <div className="col md-3">
      <div className="card" >
        <div className="card-body">
         <h5 className="card-title"> {note.title} </h5>{" "}
            <p className="card-text">{note.description}</p>
            <button  type="text" className="btn btn-primary" onClick={()=>{deletenote(note._id); props.showalert("Deleted successfully","success")}}>Delete</button>
            <button type="text" className="btn btn-primary mx-3 my-3" onClick={()=>{updateNote(note)}}> Edit </button>
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Noteitem;
