import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
//
interface UserType {
  token: string;
  userId: string;
  firstName: string;
  lastName: string;
  hashedPassword: string;
  username: string;
}
const initValue = {
  token: "",
  userId: "",
  firstName: "",
  lastName: "",
  hashedPassword: "",
  username: "string",
};
//
const Signup = () => {
  const cookies = new Cookies();
  const [user, setUser] = useState<UserType>({
    token: "",
    userId: "",
    firstName: "",
    lastName: "",
    hashedPassword: "",
    username: "string",
  });
  //
  const handleSignup = () => {
    axios.post("http://localhost:3001/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;
      //
      console.log(res.data);
      //
      cookies.set("token_tic-tac", token);
      cookies.set("userId_tic-tac", userId);
      cookies.set("username_tic-tac", username);
      cookies.set("firstname_tic-tac", firstName);
      cookies.set("lastname_tic-tac", lastName);
      cookies.set("hashedPassword_tic-tac", hashedPassword);
    });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Firstname"
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Lastname"
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
