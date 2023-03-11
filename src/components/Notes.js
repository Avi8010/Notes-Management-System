import React, { useContext,useEffect,useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddNote from './AddNote';
import noteContext from './context/noteContext';
import Noteitem from './Noteitem';

export const Notes = (props) => {
    const context = useContext(noteContext);
    const {notes,getnote,editnote}= context;
    let history=useNavigate();
    useEffect(() => {
      if(localStorage.getItem('token')){
        getnote()
      }
      else{
        history('/login');
      }
    })
    const ref = useRef(null);
    const refClose=useRef(null);
    const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""})
    const updateNote=(currentnote)=>{
        ref.current.click();
        setnote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
        
    }
    const handleClick=(e)=>{
        e.preventDefault();

        // addnote(note.title,note.description,note.tag);
        editnote(note.id,note.etitle,note.edescription,note.etag)
        
        refClose.current.click();
        props.showalert("Updated successfully","success")
    }
    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
    <>
    <AddNote showalert={props.showalert}/>
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
       Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
        <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/> 
        </div>
        <div className="mb-3 ">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription}onChange={onChange}/>
        </div>
        <div className="mb-3 ">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
        </div>
      </form>
      <div/>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
   
    <div className="row my-3">
        <h2>Your Notes</h2>
            <div className="container">
            {notes.length===0 && 'You have no notes'}
            </div>
            {notes.map((note)=>{
              
            return <Noteitem  key={note._id} updateNote={updateNote} showalert={props.showalert} note={note}/> 
            
            })}
    </div>
    </>
    
    )
}
export default Notes