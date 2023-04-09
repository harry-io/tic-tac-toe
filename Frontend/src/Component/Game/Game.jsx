import React, { useState } from "react";
import Board from "../Board/Board";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";
const Game = ({ channel }) => {
  const [playersCount, setPlayersCount] = React.useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });
  channel.on("user.watching.start", (e) => {
    setPlayersCount(e.watcher_count === 2);
  });
  if (!playersCount) {
    return <div>Waiting...</div>;
  }
  return (
    <div>
      <Board result={result} setResult={setResult} />
      <Window>
        <MessageList
          hideDeletedMessages
          disableDateSeparator
          closeReactionSelectorOnClick
        />
        <MessageInput noFiles />
      </Window>
    </div>
  );
};

export default Game;
