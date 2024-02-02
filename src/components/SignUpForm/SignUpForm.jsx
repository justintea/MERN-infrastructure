import { Component } from "react";
import { signUp } from "../../utilities/users-service";

export default class SignUpForm extends Component {
  // state = {
  //   name: "me",
  //   email: "me@home",
  //   password: "111",
  //   confirm: "111",
  //   error: "",
  // };
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",    
    error: "",
  };
  //? render() is for a class component to return their JSX component 
  //? later when you send this state, dont need to send 'confirm' and 'error', not necessary

  // const [state, setState] = useState( )

  // The object passed to setState is merged with the current state object
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  //* handleSubmit onSubmit
  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   window.alert(JSON.stringify(this.state));   };
  handleSubmit = async (event) => {
    event.preventDefault();

    try {                                                 //? NEW CODE
      // await postData("/api/users", formData);
      //* token 
      // const token = await signUp(this.state);

      // if (token.error) {
      //   this.setState({ error: token.error });
      // } else {
      //   localStorage.setItem("token", token.token);
      // }
      const { name, email, password } = this.state;
      const formData = { name, email, password };
      //? another way of doing the above, more beginner
      // const formData = { ...this.state };
      // delete.formData.error;
      // delete.formData.confirm;
      //? ----

      //? the promise returned by the signUp service method will resolve to 
      //? the user object included in the payload of the JSON web token (JWT)
      const user = await signUp(formData);

      //? baby steps
      // console.log(user);
      //? advanced props
      this.props.setUser(user);
    } 
    
    catch {
        //? Catch use case: An error occured. Probably due to duplicate email 
        // const error = JSON.stringify(e);
        console.log("error", typeof error);
        this.setState({ error: 'Sign up failed. Try again' });      // update the state property 'error', with a string. and using 'this.setState' for class components
      }
    
  }

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <>
        <div>
          <h3>Signup Form</h3>

          <div className="form-container">
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <label>Confirm</label>
              <input
                type="password"
                name="confirm"
                value={this.state.confirm}
                onChange={this.handleChange}
                required
              />
              <button type="submit" disabled={disable}>
                SIGN UP
              </button>
            </form>
          </div>
          <p className="error-message">&nbsp;{this.state.error}</p>
        </div>
      </>
    );
  }
}
