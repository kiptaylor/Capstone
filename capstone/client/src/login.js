//Must install in client:
// React
// Axios - simple way to replicating http fetch function request


import React, {useState} from "react";
import logo from "./logo.svg";
import Axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
//import "./App.css";

function Login() {
  const [data, setData] = React.useState(null);

  // States for Registration
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
	
  // States for log in 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
	
  // State for feedback on login status 
  const [loginStatus, setLoginStatus] = useState(false);
	
  // Must do this on front-end
  Axios.defaults.withCredentials = true;
  
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
		  if(!response.data.auth) {
			  setLoginStatus(false);
		  } else {
			  setLoginStatus(true);
			 
		  }
		  

		  
		  
	  });
  };
	


	
	
// JWT is Authenticated get function
const userAuthenticated = () => {
	Axios.get('http://localhost:3001/isUserAuth', { 
		
		
		headers: {
			"x-access-token": localStorage.getItem("token"),
		},
			
			
		}).then((response) => {
			console.log(response);
		});
	};

  React.useEffect(() => {
    Axios.get("http://localhost:3000/login").then((response)=>{
		if(response.data.loggedIn = true) {
			console.log(response);
			localStorage.setItem("token", response.data.token);
			//setLoginStatus(true);
			console.log(loginStatus);
		} 
		
	})
  }, []);

const goDash = () => {
	
	 Axios.get("http://localhost:3000/login").then((response)=>{
		if(response.data.loggedIn = true) {
			console.log(response);
			localStorage.setItem("token", response.data.token);
			setLoginStatus(true);
	
		} 
		
	});
	



};

	

  return (
	 
	
	  <div className="App">
	
	  
	

	
	  	<div className="registration">
	  		<h1>User Registration</h1>
	  		<label st>Username</label>
	  		<input className="userbox" type="text" 
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
	  		<h1>Log In Below</h1>
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
	  		<button onClick= { login }>Log In</button>
			{loginStatus && (<Navigate to="/Dashboard"/>)}
			
		
			
		
	  	</div>
			
		
			
	  </div>
	  

	  
	  
  );
}

export default Login;





