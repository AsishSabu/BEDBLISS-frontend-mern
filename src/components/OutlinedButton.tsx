import React from "react";
import { Button } from "@material-tailwind/react";

// Define the props interface
interface OutlinedButtonProps {
  text: string;
  onClick: () => void;
  color: any;
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({ text, onClick, color }) => {
  return (
    <div>
      <Button
        size="sm"
        onClick={onClick}
        color={color}
        variant="outlined"
        className="flex items-center gap-3"
      >
        {text}
      </Button>
    </div>
  );
};

export default OutlinedButton;
