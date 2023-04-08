import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie/cjs/Cookies";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
//
function Auth() {
  //
  const api_key = "9ahsyjv8eeu9";
  const cookies = new Cookies();
  const token = cookies.get("token_tic-tac");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  //
  const handleLogout = () => {
    cookies.remove("token_tic-tac");
    cookies.remove("userId_tic-tac");
    cookies.remove("firstName_tic-tac");
    cookies.remove("lastName_tic-tac");
    cookies.remove("hashedPassword_tic-tac");
    cookies.remove("channelName_tic-tac");
    cookies.remove("username_tic-tac");
    client.disconnectUser();
    setIsAuth(false);
  };
  //
  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId_tic-tac"),
          name: cookies.get("username_tic-tac"),
          firstname: cookies.get("firstname_tic-tac"),
          laststname: cookies.get("lastname_tic-tac"),
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
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Signup />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default Auth;
