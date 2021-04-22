const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "acstory",
    password: "1234",
    database: "studyreact"
});

if(db) {
    console.log("DB Access successFull");
    db.connect();
}else {
    console.log("DB Access Fail");
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req,res) => {

    const sqlSelect = 
    "SELECT * FROM reacttable";
    db.query(sqlSelect, (err, result)=> {
        res.send(result);
    });

});

app.post("/api/insert", (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO reacttable (movieName, movieReview) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result)=> {
        console.log(result);
    });

});

app.listen(3001, ()=> {
    console.log("running on port 3001");
});