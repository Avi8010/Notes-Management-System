// import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  let history=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    history("/login");
  }
  let location=useLocation();

  //highlighting open tab
  // useEffect(()=>{
  //   console.log(location);
  // },[location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Navbar</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} to="/about ">About</Link>
          </li>
          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><hr className="dropdown-divider"/></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled">Disabled</a>
          </li> */}
        </ul>
        {!localStorage.getItem('token')?<form className="d-flex">
          {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button> */}
          <Link className="btn btn-outline-light mx-2" to="/login" type="button">Login</Link>
          <Link className="btn btn-outline-light mx-2" to="/signup" type="button">SignUp</Link>
        </form>:<button className='btn btn-primary' onClick={handleLogout} >Log Out</button>}
      </div>
    </div>
  </nav>  
  );
}

export default Navbar