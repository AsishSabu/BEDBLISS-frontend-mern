import React, { useEffect, useRef, useState } from "react";
import { Formik, useFormik } from "formik";
import { OWNER_API } from "../../constants";
import showToast from "../../utils/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../../utils/localStorage";

const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      otp: Array.from({ length: 6 }).fill(""),
    },

    onSubmit: (values) => {
      const userid = getItemFromLocalStorage("userId");
      console.log("...........", userid);
      const otp = values.otp.join("");
      console.log(otp);
      if (userid) {
        axios
          .post(OWNER_API + "/auth/verifyOtp", { otp, userid })
          .then(({ data }) => {
            showToast(data.message, "success");
            removeItemFromLocalStorage("userId");
            navigate("/owner/login");
          })
          .catch(({ response }) => {
            showToast(response.data.message, "error");
          });
      } else {
        showToast("something went wrong", "error");
        return navigate("/owner/login", { replace: true });
      }
    },
  });
  const inputRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const currentInput = inputRef.current[0];
    if (currentInput) {
      currentInput.focus();
      currentInput.addEventListener("paste", pasteText);
      return () => currentInput.removeEventListener("paste", pasteText);
    }
  }, []);

  const pasteText = (event: ClipboardEvent) => {
    const pastedText = event.clipboardData?.getData("text");
    const newOtp = pastedText
      ?.split("")
      .slice(0, 6)
      .map((char) => char || "");
    formik.setValues((prev: any) => ({
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
    formik.setValues((prev) => ({
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
    return formik.values.otp.map((value, index) => (
      <input
        key={index}
        maxLength={1}
        type="text"
        name={index.toString()}
        value={value as string}
        onKeyUp={(event) => handleBackSpace(event, index)}
        ref={(element) => (inputRef.current[index] = element)}
        onChange={(event) => handleChange(event, index)}
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
                  Enter the 4-digit verification code that was sent to your
                  phone number.
                </p>
              </header>
              <form id="otp-form">
                <Formik>
                  <div className="flex items-center justify-center gap-3">
                    {renderInput()}
                  </div>
                </Formik>

                <div className="max-w-[260px] mx-auto mt-4">
                  <button
                    onClick={formik.handleSubmit}
                    type="submit"
                    className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                  >
                    Verify Account
                  </button>
                </div>
              </form>
              <div className="text-sm text-slate-500 mt-4">
                Didn't receive code?{" "}
                <a
                  className="font-medium text-indigo-500 hover:text-indigo-600"
                  href="#0"
                >
                  Resend
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyOtp;
