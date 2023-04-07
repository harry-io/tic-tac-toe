import Square from "../Component/Square";
interface Props {
  board: string[];
  handleClick(index: number): void;
}
const Game = (props: Props) => {
  const { board, handleClick } = props;
  const styles = {
    board: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      width: "300px"
    }
  };
  return (
    <div className="grid w-76 grid-cols-3 gap-1 mt-6 ">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          index={index}
          handleClick={handleClick}
          
        />
      ))}
    </div>
  );
};
export default Game;
