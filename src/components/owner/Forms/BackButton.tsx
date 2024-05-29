type dataType = {
    index: number;
    back(): void;
  };
  
  const BackButton = ({ index, back }: dataType) => {
    if (index > 0)
      return (
        <button
          type="button"
          className="text-Cool_gray font-extrabold bg-blue-500 py-4 px-6 mt-4 rounded-xl ease-in-out duration-200 hover:text-Purplish_blue"
          onClick={back}>
          Go Back
        </button>
      );
    else return '';
  };
  
  export default BackButton;