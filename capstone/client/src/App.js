
import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

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
	  		<input type="text" />
	  		<label>Password</label>
	  		<input type="text" />
	  		<button> Register </button>
	  	</div>
	  
	  
	  	<div className="login">
	  		<h1>Registration</h1>
	  		<input type="text" placeholder="Username..."  />
	  		<input type="password" placeholder="Password..." />
	  		<button>Register</button>
	  	</div>
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