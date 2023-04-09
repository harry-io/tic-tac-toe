import React, { useState } from "react";
import "./App.css";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie/cjs/Cookies";
import Signup from "./Components/Signup/Signup";
import axios from "axios";

import JoinGame from "./Components/Game/JoinGame";
//
function Auth() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //
  const api_key = "9ahsyjv8eeu9";
  const cookies = new Cookies();
  const token = cookies.get("token_tic-tac");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState<boolean>(
    cookies.get("isAuth_tic-tac") || false
  );
  //
  const handleLogout = () => {
    cookies.remove("token_tic-tac");
    cookies.remove("userId_tic-tac");
    cookies.remove("firstName_tic-tac");
    cookies.remove("lastName_tic-tac");
    cookies.remove("hashedPassword_tic-tac");
    cookies.remove("channelName_tic-tac");
    cookies.remove("username_tic-tac");
    cookies.remove("isAuth_tic-tac");
    client.disconnectUser();
    setIsAuth(false);
  };
  //
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
        cookies.set("firstName_tic-tac", firstName);
        cookies.set("lastName_tic-tac", lastName);
        cookies.set("isAuth_tic-tac", true);
        setIsAuth(true);
      });
  };
  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId_tic-tac"),
          name: cookies.get("username_tic-tac"),
          firstName: cookies.get("firstName_tic-tac"),
          lastName: cookies.get("lastName_tic-tac"),
          hashedPassword: cookies.get("hashedPassword_tic-tac"),
        },
        token
      )
      .then((user) => {
        console.log(user);
      });
  }
  return (
    <div className="App">
      {isAuth ? (
        <>
          <Chat client={client}>
            <JoinGame />
            <button onClick={handleLogout}>Logout</button>
          </Chat>
        </>
      ) : (
        <>
          <Signup />
          {/* LOGIN */}
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
          {/*  */}
        </>
      )}
    </div>
  );
}

export default Auth;
