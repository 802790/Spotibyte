//Import express framework
const express = require("express")
//Initialize server object
const app = express()
const sqlite3 = require('sqlite3').verbose();
 
// open the database
let db = new sqlite3.Database('./db/data.db');
 
//Parse request data coming in
app.use(express.json())
//Serve ‘public’ folder as static website
app.use( express.static('public') )

app.get("/songs", (req, res) => {
    let sql = `SELECT * FROM songs`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
          //nothing for each row
        });
        console.log("GET /songs - items sent to user");
        res.send(rows);
    });
})

app.post("/register", (req, res) => {
    const user = req.body.user
    const sql = `INSERT INTO users 
    (firstname, lastname, email, username, password) 
    VALUES (?, ?, ?, ?, ?)`
    const values = [user.first, user.last, user.email, user.username, user.password]
    let userID
    db.all(sql, values, function (err) {
        if (err)
            console.log(err)
        else {            
            console.log(`userid ${this.lastID} created`)
        }
    })
    
    res.json({
        message: 'User registered in',
        userID: userID 
    })
})

//Listens for web requests
app.listen(80, () => console.log("Server started") )