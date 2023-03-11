import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  // const s={
  //     "name":"abc",
  //     "class":"x"
  // }
  // const [state, setstate] = useState(s);
  // const update=()=>{
  //     setTimeout(()=>{
  //         setstate({
  //             "name":"xyz",
  //             "class":"a"
  //         })
  //     },1000);
  // }
  
  
  const notesinit = []
  const [notes, setnotes] = useState(notesinit);
  //   {
  //     _id: "63382383ad80f63af0d540d4",
  //     user: "63380fe0214a6307dfba9711",
  //     title: "my title-updated",
  //     description: "never gave up,updated",
  //     tag: "personal",
  //     date: "2022-10-01T11:24:51.010Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "633828d86eafb5b72d46743f",
  //     user: "63380fe0214a6307dfba9711",
  //     title: "my title",
  //     description: "never gave up",
  //     tag: "personal",
  //     date: "2022-10-01T11:47:36.229Z",
  //     __v: 0,
  //   },
  // ];
  const getnote =async () => {
    const response = await fetch(
      `${host}/api/notes/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token'),
        }
      });
    const json =await response.json()
    //console.log(json)
    setnotes(json)
  }
  //add a note
  const addnote = async (title,description,tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token'),
        },
        
        body: JSON.stringify({title:title,description:description,tag:tag}),
      });
      const note = await response.json();
    //  console.log(json);
    //console.log("adding a new note")
    // const note = {
    //   "_id": "63382c9cf778d3162fdf383c",
    //   "user": "63380fe0214a6307dfba9711",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2022-10-01T12:03:40.984Z",
    //   "__v": 0,
    // };
    setnotes(notes.concat(note));
  };
  //delete a note
  const deletenote = async (id) => {
    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token'),
        }
        // body: JSON.stringify(title,description,tag),
      }
    );
    const json= await response.json()
     console.log(json)

    // console.log("deleting" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNote);
  };

  //edit a note
const editnote = async (id, title, description, tag) => {
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token'),
        },
        // body: JSON.stringify(title,description,tag),
        body: JSON.stringify({title:title,description:description,tag:tag}),
      }
    );
    const json= await response.json();
    console.log(json);
  
  //Api call logic to edit
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if (element._id === id) {
      element.title = title;
      element.description = description;
      element.tag = tag;
    }
  }
}
  return (
    // <NoteContext.Provider value={{state,update}}>
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote,getnote}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
