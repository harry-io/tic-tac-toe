interface Props {
    index: number;
    value: string;
    handleClick(index: number): void;
  }
  const Square = (props: Props) => {
    const { index, value, handleClick } = props;
    
    return (

      <div className="flex justify-center m-2 bg-gradient-to-r from-cyan-500 to-blue-500">

      <button className="border-2 border-red-200 h-28 w-28 text-5xl" onClick={() => handleClick(index)}>
      {value}
    </button>
     
  </div> 

     
    );
  };
  export default Square;


  


   
  