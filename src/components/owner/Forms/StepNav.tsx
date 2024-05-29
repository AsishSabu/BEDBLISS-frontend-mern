import { Progress } from 'flowbite-react';

type dataType = {
  currentIndex: number;
};

const StepNav = ({ currentIndex }: dataType) => {
  const steps: string[] = ['Your Info', 'Account', 'Select Plan', 'Add-ons'];

  // Calculate progress percentage based on current index
  const progressPercentage = ((currentIndex ) / steps.length) * 100;

  return (
    <div className="relative m-4">
      <Progress progress={progressPercentage} color="blue" />

      <div className="flex justify-between mt-2 m-4">
        {steps.map((item, index) => (
          <div key={index} className={`text-center ${index <= currentIndex ? 'font-bold' : 'text-gray-500'}`}>
            <div className={`mb-2 ${index <= currentIndex ? 'text-blue-600' : 'text-gray-400'}`}>{item}</div>
            <div className={`h-2 w-2 rounded-full ${index <= currentIndex ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepNav;
