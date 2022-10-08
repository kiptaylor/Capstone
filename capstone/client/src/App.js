//Must install in client:
// React
// Axios - simple way to replicating http fetch function request



import React, {useState} from "react";
import logo from "./logo.svg";
import Axios from 'axios';
import "./App.css";


function App() {
  const [data, setData] = React.useState(null);

  // States for Registration
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
	
  // States for log in 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
	
  // State for feedback on login status 
  const [loginStatus, setLoginStatus] = useState("");
  
  // To put registration info and send request to back-end to insert user into DB
  const register = () => {
	  Axios.post('http://localhost:3001/register', {
		  username:usernameReg, 
		  password:passwordReg,
	  }).then((response)=> {
		  console.log(response);
	  });
  };
	
	
  // To put login info and send request to back-end to select user from DB
  const login = () => {
	  Axios.post('http://localhost:3001/login', {
		  username:username,
		  password:password,
	  }).then((response)=> {
		  if(response.data.message) {
			  setLoginStatus(response.data.message);
		  } else {
			  setLoginStatus(response.data[0].email);
		  }
		  
		  console.log(response);
		  
	  });
  };

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
	
	


  return (
	  
	  
	  
	  
	  <div className="App">
	  	<div className="registration">
	  		<h1>Registration</h1>
	  		<label>Username</label>
	  		<input type="text" 
	  		onChange= {(e)=> {
	  				setUsernameReg(e.target.value);
  			}}
			/>
	  		<label>Password</label>
	  		<input type="text" 
			onChange= {(e)=> {
	  				setPasswordReg(e.target.value);
  			}}
			
			/>
	  		<button onClick= { register }> Register </button>
	  	</div>
	  
	  
	  	<div className="login">
	  		<h1>Log In</h1>
	  		<input type="text" placeholder="Username..."  
			onChange= {(e)=> {
				setUsername(e.target.value);
			}}
			/>
	  		<input type="password" placeholder="Password..."
			onChange= {(e)=> {
				setPassword(e.target.value);	   
			}}
			
			
			/>
	  		<button onClick= { login }>Register</button>
	  	</div>
			
			<h1>{ loginStatus }</h1>
			
			
	  </div>
	  
	  
   // <div className="App">
     // <header className="App-header">
       // <img src={logo} className="App-logo" alt="logo" />
        //<p>{!data ? "Loading..." : data}</p>
     // </header>
    // </div>
	  
	  
	  
  );
}

export default App;