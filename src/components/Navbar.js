import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Alert from "./Alert";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  let navigate=useNavigate();
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);

  const context = useContext(noteContext);
  const { alert,showAlert } = context;

  const handelClick=()=>{
    localStorage.removeItem('token');
    navigate('/login');
    showAlert("You are logged Out sucessfully","danger");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
          E-ComMerce
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form>
                <Link className="btn btn-primary mx-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary mx-1" to="/signup">
                  SignUp
                </Link>
              </form>
            ) : (
              <button className="btn btn-primary mx-1" onClick={handelClick}>
                SignOut
              </button>
            )}
          </div>
        </div>
      </nav>
      <Alert alert={alert} />
    </div>
  );
}