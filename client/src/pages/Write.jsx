import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      // If state exists, load existing data
      setAge(state.age || "");
      setGender(state.gender || "");
      setDob(state.dob || "");
      setMobile(state.mobile || "");
    }
    setDataLoaded(true);
  }, [state]);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (state) {
        // If state exists, update existing data
        await axios.put(`/posts/${state.id}`, {
          age,
          gender,
          dob,
          mobile,
        });
      } else {
        // Otherwise, create new data
        await axios.post(`/posts/`, {
          age,
          gender,
          dob,
          mobile,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="menu">
        <div className="item">
          <h1>Additional Details</h1>
          {dataLoaded && (
            <table>
              <tbody>
                <tr>
                  <td>Age:</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Gender:</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Date of Birth:</td>
                  <td>
                    <input
                      type="date"
                      placeholder="Date of Birth"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Mobile Number:</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Mobile Number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          <button onClick={handleClick}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Write;
