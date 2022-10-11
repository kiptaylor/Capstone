const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

// Required dependencies to hold user session
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Required dependencies for JWT
const jwt = require("jsonwebtoken");


//bcrypt used for hashing password
const saltRounds = 10;

const PORT = process.env.PORT || 3001;

// var for express
const app = express();

// Using dependencies
app.use(express.json());

app.use(cors({
	origin: ["http://localhost:3000"],
	methods: ["GET", "POST"],
	credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

// Initialize the session
app.use(session({
	//name of cookie you create
	key:"userId",
	// Keep this safe
	secret:"subscribe",
	resave: false,
	saveUninitialized: false,
	cookie: {
		// session expires after 12 hours (in ms)
		expires: 60*60*12,
	},
}));

// Create DB connection
const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "Capstone$$",
	database: "CapstoneProject",
});


// GET (express)
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// POST (express)
app.post("/register", (req, res) => {
	
	
	const username = req.body.username;
	const password = req.body.password;
	
	bcrypt.hash(password, saltRounds, (error, hash)=> {
		
		
		if(error) {
			console.log(error);
		}
		
		db.query("INSERT INTO users (email, password) VALUES (?,?)", 
			 [username, hash], 
			 (err, result)=> {
				console.log(err);
				
			}
		);
			
	});
	
	
});



// GET /login
app.get("/login", (req, res)=> {
	if(req.session.user) {
		res.send({loggedIn:true, user:req.session.user})
	} else {
		res.send({loggedIn:false})
	}
});

// Verify JWT logic
const verifyJWT = (req, res, next) => {
	const token = req.headers["x-access-token"];
	
	if(!token) {
		res.send("Need a token...")
	} else {
		jwt.verify(token, "jwtsecret", (err,decoded)=>{
			if(err) {
				res.json({auth: false, message: "failed to verify token"});
			} else {
				req.userId = decoded.id;
				next();
			}
			
		});
	}
};

// GET
// Verify JWT -> middleware, used to authenticate the request
app.get("/isUserAuth", verifyJWT, (req, res)=> {
	
	res.send("you are authenticated");
	
	
});

// POST (express)
app.post("/login", (req, res) => {
	
	const username = req.body.username;
	const password = req.body.password;
	
	db.query("SELECT * FROM users WHERE email = ?;",
		username,
		(err, result)=> {
		if(err) {
			res.send({err: err});
			
		} 
		
		
		if(result.length > 0) {
			bcrypt.compare(password, result[0].password, (error, response)=> {
				
				if(response) {
					
					const id = result[0].id;
					// instead of "jwtsecret", better practice would be to add .env file
					const token = jwt.sign({id}, "jwtsecret", {
						expiresIn: 300,
					});
				
					req.session.user = result;
					
					res.json({auth: true, token: token, result: result});
					
				} else {
					res.send({message: "Incorrect user/pass combination!"});
				}
			});
			
		} else {
			res.send({message: "User does not exist!"});
		}
		}
	);
	
});


// Listen
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


