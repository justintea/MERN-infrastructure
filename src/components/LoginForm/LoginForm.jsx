import * as usersService from "../../utilities/users-service";
import { useState } from "react";

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  export default function LoginForm({ setUser }) {
    //* so there are 2 states: 'credentials' and 'error'
    const [credentials, setCredentials] = useState({
      email: "",
      password: "",
    });
    const [error, setError] = useState("");
    
    //* an onChange-handleChange
    function handleChange(evt) {
      setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
      setError("");
    }

    //* 
    const handleSubmit = async (event) => {
      //? Prevent form from automatically being submitted to the server
      event.preventDefault();

      //? initial code 
      // const form = new FormData(event.target);
      // const data = Object.fromEntries(form);
      // const token = await postData("/api/users/login", data); //? NEW CODE
      // localStorage.setItem("token", token.token);
      // setUser(getUser());
      //? new Part 6 code 
      try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
        const user = await usersService.logIn(credentials);
        setUser(user);      // become that user
      }
      catch {
        setError('The email and password you specified are invalid. Please try again.') }
    };


    return (
      //* this is a formSubmit, compared to a Controlled form and Uncontrolled
      <>
        <h3>Login</h3>
        <div>
          <div className="form-container">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
              
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />

              <button type="submit">LOG IN</button>
            </form>
          </div>

          <p className="error-message">&nbsp;{error}</p>
        </div>
      </>
    );
  }
  
  // <fieldset>
  //       <legend>Login</legend>
  //       <label>
  //         Email: <input name="email" type="email" />
  //       </label>
  //       <br />
  //       <label>
  //         Password:
  //         <input name="password" />
  //       </label>
  //       <br />
  //       <button>Login</button>
//     </fieldset>
  
//? initial form
{
  /* <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" name="email" required />

            <label>Password</label>
            <input name="password" required />

            <button type="login">LOGIN</button>
          </form>
        </div> */
}