const SuccessPage = () => {
    return (
      <div className="overflow-auto flex p-12 flex-col gap-6 h-full w-full justify-center items-center font-mono">
        <img src="./images/icon-thank-you.svg" alt="Thank you icon" />
        <h2 className="text-Marine_blue font-black text-4xl tracking-[-2px]">
          Thank You!
        </h2>
        <p className="text-Cool_gray word-spacing-[8px] tracking-tighter text-center text-base">
          Thanks for confirming your subscription! We hope you have fun using our
          platform. If you ever need support, please feel free to email us at
          support@loremgaming.com.
        </p>
      </div>
    );
  };
  
  export default SuccessPage;