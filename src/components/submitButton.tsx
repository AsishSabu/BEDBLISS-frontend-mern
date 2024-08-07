import React from 'react';

// Define the props type
interface SubmitButtonProps {
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick }) => {
  return (
    <button
      className='bg-Marine_blue my-6 text-white text-center font-bold text w-full h-9 rounded-full leading-10 tracking-widest hover:bg-Strawberry_red hover:text-orange'
      onClick={onClick}
    >
      Rate Now
    </button>
  );
};

export default SubmitButton;
