interface Props {
    name: string | null;
    restart(): void;
  }
  const Finished = (props: Props) => {
    const { name, restart } = props;
    return (
      <div className="flex flex-col justify-center m-2 bg-gradient-to-r from-cyan-500 to-blue-500">
        <h1 className="text-black text-3xl">
          {name && `Player ${name} won the game`}
          {!name && "It's a tie "}
        </h1>
        <button onClick={restart} className="border-2">Restart</button>
      </div>
    );
  };
  export default Finished;
  