const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "Capstone$$",
	database: "CapstoneProject",
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/register", (req, res) => {
	
	
	const username = req.body.username;
	const password = req.body.password;
	
	
	
	db.query("INSERT INTO users (email, password) VALUES (?,?)", 
			 [username, password], 
			 (err, result)=> {
				console.log(err);
				
			}
	);
});



app.post("/login", (req, res) => {
	
	const username = req.body.username;
	const password = req.body.password;
	
	db.query("SELECT * FROM users WHERE email = ? AND password = ?",
		[username, password],
		(err, result)=> {
		if(err) {
			res.send({err: err});
		} 
		
		
		if(result.length > 0) {
			res.send(result);
		} else {
			res.send({message: "Wrong user/pass combination"});
		}
		}
	);
	
});



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


