import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {     
  const [hospitalName, setHospitalName] = useState("");
  const [review, setReview] = useState("");
  const [hospitalReviewList, sethospitalReviewList] = useState([]);

  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      sethospitalReviewList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      hospitalName: hospitalName,
      hospitalReview: review,
    });

    sethospitalReviewList([
      ...hospitalReviewList,
      { hospitalName: hospitalName, hospitalReview: review },
    ]);
  };

  const deleteReview = (hospital) => {
    Axios.delete(`http://localhost:3001/api/delete/${hospital}`);
  };

  const updateReview = (hospital) => {
    Axios.put("http://localhost:3001/api/update", {
      hospitalName: hospital,
      hospitalReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="App">
      <h1>CRUD OPERATION FULLSTACK</h1>
      <div className="form">
        <label>Hospital Name : </label>
        <input
          type="text"
          name="hospitalName"
          onChange={(e) => {
            setHospitalName(e.target.value);
          }}
        />
        <label>Review : </label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <button onClick={submitReview}>Submit</button>

        {hospitalReviewList.map((val) => {
          return (
            <div className="card">
              <h1>{val.hospitalName}</h1>
              <p>{val.hospitalReview}</p>
              <button
                onClick={() => {
                  deleteReview(val.hospitalName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(val.hospitalName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
