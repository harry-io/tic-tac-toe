import { stringify } from "querystring";
import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";
import Game from "./Game";
import { Channel } from "stream-chat-react";

const JoinGame = () => {
  const [playerId, setPlayerId] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);

  //
  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: playerId } });
    //
    if (response.users.length === 0) {
      alert("User not found !");
      return;
    }
    //
    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });
    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel}>
          <Game channel={channel} />
        </Channel>
      ) : (
        <div>
          <h1>Tic Tac Toe</h1>
          <input
            type="text"
            placeholder="Player's ID"
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
          />
          <button onClick={createChannel}>START</button>
        </div>
      )}
    </>
  );
};

export default JoinGame;
