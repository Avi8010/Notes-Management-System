import './App.css';
import { Home } from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import NoteState from './components/context/notestate';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Alert from './components/Alert';

function App() {
  const [alert, setalert] = useState(null)
  const showalert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setalert(null)
    },1500);
  }
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container">
    <Routes>
          <Route exact path="/" element={<Home showalert={showalert}/>}>
          </Route>
          <Route exact path="/about" element={<About/>}>
          </Route>
          <Route exact path="/login" element={<Login showalert={showalert}/>}>
          </Route>
          <Route exact path="/signup" element={<Signup showalert={showalert}/>}>
          </Route>
          
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
