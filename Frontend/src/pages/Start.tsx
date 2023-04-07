import { useState, useMemo, FormEvent } from "react";

interface Props {
  handleStart(players: string[]): void;
}

const Start = (props: Props) => {
  const { handleStart } = props;
  const [players, setPlayers] = useState(["", ""]);
  const handleInput = (event: FormEvent<HTMLInputElement>, index: number) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1, event.currentTarget.value);
    setPlayers(newPlayers);
  };
  const canStart = useMemo(
    () => players.every((player) => player && player.length > 0),
    [players]
  );
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canStart) return;
    handleStart(players);
  };
  return (
    <div className=" border-2 border-red-700  flex flex-col  items-center h-96 m-2 bg-gradient-to-r from-cyan-500 to-blue-500 w-full">
      <h1 className="text-gray-500 font-black mt-2">React Tic Tac Toe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="player1">Player 1</label>
          <input
            type="text"
            className="border-2 border-dashed mt-2 ml-1"
            value={players[0]}
            onInput={(e) => handleInput(e, 0)}
          />
        </div>
        <div>
          <label htmlFor="player2">Player 2</label>
          <input
            type="text"
            className="border-2 border-dashed mt-2 ml-1"
            value={players[1]}
            onInput={(e) => handleInput(e, 1)}
          />
        </div>
        <div>
          <button type="submit"   disabled={!canStart} className="border-2 text-black bg-cyan-500 " >
            Start
          </button>
        </div>
      </form>
    </div>
  );
};
export default Start;
