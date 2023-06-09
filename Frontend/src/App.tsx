import Game from "./pages/Games";
import Start from "./pages/Start";
import Finished from "./pages/Finished";
import useTickTackToe from "./hooks/useTicTacToe";
import AllRoutes from "./Routes/AllRoutes";

const App = () => {
  const game = useTickTackToe();
  return (
    <>
      <AllRoutes />
      <div className="flex justify-center">
        {game.status === "created" && <Start handleStart={game.handleStart} />}
        {game.status === "finished" && (
          <Finished name={game.winner} restart={game.handleRestart} />
        )}
        {game.status === "started" && (
          <Game board={game.board} handleClick={game.handleClick} />
        )}
      </div>
    </>
  );
};
export default App;
