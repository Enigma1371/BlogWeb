import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO user_details(`age`, `gender`, `dob`, `mobile`, `uid`) VALUES (?, ?, ?, ?, ?)";

    const values = [
      req.body.age,
      req.body.gender,
      req.body.dob,
      req.body.mobile,
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("User details have been created.");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE user_details SET `age`=?,`gender`=?,`dob`=?,`mobile`=? WHERE `uid` = ?";

    const values = [
      req.body.age,
      req.body.gender,
      req.body.dob,
      req.body.mobile,
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("User details have been updated.");
    });
  });
};
