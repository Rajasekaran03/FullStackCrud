const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "raja",
  database: "cruddatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM hospital_reviews";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const hospitalName = req.body.hospitalName;
  const hospitalReview = req.body.hospitalReview;

  const sqlInsert =
    "INSERT INTO hospital_reviews (hospitalName,hospitalReview) VALUES(?,?)";
  db.query(sqlInsert, [hospitalName, hospitalReview], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete/:hospitalName", (req, res) => {
  const name = req.params.hospitalName;

  const sqlDelete = "DELETE FROM hospital_reviews WHERE hospitalName= ? ";
  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const name = req.body.hospitalName;
  const review = req.body.hospitalReview;

  const sqlUpdate =
    "UPDATE hospital_reviews SET hospitalReview= ? WHERE hospitalName=? ";
  db.query(sqlUpdate, [review,name], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log("port running om 3001");
});
