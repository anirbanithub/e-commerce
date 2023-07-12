import React ,{useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const SignUp = () => {
  const [credentials, setCredentials] = useState({ name:"",email: "", password: "",cpassword:""});
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const context=useContext(noteContext);
  const {showAlert}=context;

  let navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.sucess) {
      localStorage.setItem("token", json.authtoken); //saving our data to local storge
      navigate("/");
      showAlert("User is Created Sucessfully ","success");
    } else {
      showAlert("User with this email alrady exist","danger");
    }
  };
  return (
    <div className="mt-4">
      <h3>Sign up to continue</h3>
      <form onSubmit={handelSubmit}>
      <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input                            
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            onChange={onChange}                                     
          />
        </div>
        <div className="form-group  my-3">
          <label htmlFor="email">Email address</label>
          <input                            
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={onChange}                                     
          />
        </div>
        <div className="form-group  my-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange} 
            required
            minLength={5}
          />
        </div>

        <div className="form-group  my-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange} 
            required
            minLength={5}
          />
        </div>
        <button disabled={credentials.password!==credentials.cpassword} type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
