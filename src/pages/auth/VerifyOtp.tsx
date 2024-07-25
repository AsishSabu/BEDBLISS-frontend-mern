import axios from "axios";
import { Formik, FormikHelpers,useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_API } from "../../constants";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../../utils/localStorage";
import showToast from "../../utils/toast";

const VerifyOtp: React.FC = () => {
  const [seconds, setSeconds] = useState(60);

  const navigate = useNavigate();
  const formik = useFormik<any>({
    initialValues: {
      otp: Array.from({ length: 6 }).fill(""),
    },

    onSubmit: async (values: { otp: string[] }, formikHelpers: FormikHelpers<{ otp: string[] }>) => {
      const userid = getItemFromLocalStorage("userId");
      const otp = values.otp.join("");
      if (userid) {
        try {
          const { data } = await axios.post(USER_API + "/auth/verifyOtp", { otp, userid });
          showToast(data.message, "success");
          removeItemFromLocalStorage("userId");
          navigate("/auth/login");
        } catch (error: any) {
          showToast(error.response?.data?.message || "An error occurred", "error");
        }
      } else {
        showToast("Something went wrong", "error");
        navigate("/auth/login", { replace: true });
      }
      formikHelpers.setSubmitting(false); // Ensure to call this to update formik's isSubmitting state
    },
  });

  const inputRef = useRef<any>([]);

  useEffect(() => {
    const currentInput = inputRef.current[0];
    if (currentInput) {
      currentInput.focus();
      currentInput.addEventListener("paste", pasteText);
      return () => currentInput.removeEventListener("paste", pasteText);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const resendOtp = () => {
    setSeconds(60);
    const userId = getItemFromLocalStorage("userId");
    if (userId) {
      axios
        .post(USER_API + "/auth/resendOtp", { userId })
        .then(({ data }) => {
          showToast(data.message, "success");
        })
        .catch(({ response }) => {
          showToast(response.data.message, "error");
        });
    }
  };

  const pasteText = (event: ClipboardEvent) => {
    const pastedText = event.clipboardData?.getData("text");
    const newOtp = pastedText
      ?.split("")
      .slice(0, 6)
      .map(char => char || "");
    formik.setValues((prev:any) => ({
      ...prev,
      otp: newOtp,
    }));
    inputRef.current[5]?.focus();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;

    const currentOtp = [...formik.values.otp];
    currentOtp[index] = value.slice(-1);
    formik.setValues((prev:any )=> ({
      ...prev,
      otp: currentOtp,
    }));
    if (value && index < 5) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleBackSpace = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      if (index > 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  const renderInput = () => {
    return formik.values.otp.map((value:any, index:any) => (
      <input
        title="input"
        key={index}
        maxLength={1}
        type="text"
        name={index.toString()}
        value={value as string}
        onKeyUp={event => handleBackSpace(event, index)}
        ref={element => (inputRef.current[index] = element)}
        onChange={event => handleChange(event, index)}
        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        pattern="\d*"
      />
    ));
  };

  return (
    <div className="relative font-inter antialiased">
      <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
          <div className="flex justify-center">
            <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
              <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1">
                  Mobile Phone Verification
                </h1>
                <p className="text-[15px] text-slate-500">
                  Enter the 6-digit verification code that was sent to your
                  phone number.
                </p>
              </header>
              <Formik
                initialValues={formik.initialValues}
                onSubmit={formik.handleSubmit}
              >
                {({ handleSubmit }) => (
                  <form id="otp-form" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center gap-3">
                      {renderInput()}
                    </div>
                    <div className="max-w-[260px] mx-auto mt-4">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                      >
                        Verify Account
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
              <div className="text-sm text-slate-500 mt-4">
                Didn't receive code?{" "}
                <button
                  className="text-blue-500 underline focus:outline-none hover:text-blue-700"
                  onClick={resendOtp}
                  disabled={seconds !== 0}
                >
                  Resend OTP
                </button>
              </div>
              <span className="font-medium">
                {seconds !== 0 && ` (${seconds}s)`}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyOtp;
