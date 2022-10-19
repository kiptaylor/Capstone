//Must install in client:
// React
// Axios - simple way to replicating http fetch function request



import React from "react";
import logo from "./logo.svg";
import Axios from 'axios';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import Login from './login';
import Dashboard from "./Dashboard";


function App() {
  return (
	  	<Routes>
            <Route path="/" element={<Login/>} />
	  		 <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>

  );
}

export default App;



