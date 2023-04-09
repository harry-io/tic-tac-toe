import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import Cookies from "universal-cookie";

const Login = ({
  setIsAuth,
}: {
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}) => {
  const cookies = new Cookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios
      .post("http://localhost:3001/login", {
        username,
        password,
      })
      .then((res) => {
        const { firstName, lastName, username, token, userId } = res.data;
        //
        //
        cookies.set("token_tic-tac", token);
        cookies.set("userId_tic-tac", userId);
        cookies.set("username_tic-tac", username);
        cookies.set("firstname_tic-tac", firstName);
        cookies.set("lastname_tic-tac", lastName);
        setIsAuth(false);
      });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
