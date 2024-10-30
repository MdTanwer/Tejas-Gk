"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import { styles } from "../../../app/styles/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { loginValidationSchema } from "../../components/validations/loginValidation";
import GoogleSignInButton from "./GoogleSignInButton";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {};

const Login: FC<Props> = () => {
  const [show, setShow] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [login, { isSuccess, error, isLoading }] = useLoginMutation();
  const router = useRouter();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("login successfully", { variant: "success" });
      router.push("/dashboard");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        enqueueSnackbar(errorData.data.message, { variant: "error" });
      }
    }
  }, [isSuccess, error, enqueueSnackbar, router]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full h-screen bg-[#e1e5eb] flex justify-center items-center">
      <div className="w-full">
        <h1
          className={`text-[32px] leading-[38px] text-[#384252]  dark:text-white font-[600]  font-poppins text-center py-2`}
        >
          Sign In
        </h1>{" "}
        <div className="w-[30%] mx-auto bg-white  p-10  rounded-md">
          <form onSubmit={handleSubmit} className=" ">
            <label className={`${styles.label}`} htmlFor="email">
              Enter your Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="login@gmail.com"
              className={`${
                errors.email && touched.email && "border-red-500"
              } ${styles.input}`}
            />
            {errors.email && touched.email && (
              <span className="text-red-500 pt-2 block">{errors.email}</span>
            )}
            <div className="w-full mt-5 relative mb-1">
              <label className={`${styles.label}`} htmlFor="password">
                Enter your password
              </label>
              <div className="relative">
                <input
                  type={!show ? "password" : "text"}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  id="password"
                  placeholder="password!@%"
                  className={`${
                    errors.password && touched.password && "border-red-500"
                  } ${styles.input}`}
                />
                {!show ? (
                  <AiOutlineEyeInvisible
                    className="absolute bottom-3 right-2 z-1 cursor-pointer"
                    size={20}
                    onClick={() => setShow(true)}
                  />
                ) : (
                  <AiOutlineEye
                    className="absolute bottom-3 right-2 z-1 cursor-pointer"
                    size={20}
                    onClick={() => setShow(false)}
                  />
                )}
                {errors.password && touched.password && (
                  <span className="text-red-500 pt-2 block">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full  mt-5">
              <button
                type="submit"
                value="Sign in "
                className={`${styles.button} 800px:!w-full   !text-center !flex !items-center !justify-center `}
              >
                {" "}
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>

            <div className="flex items-center justify-center my-2">
              <div className=" w-full h-[0.5px] bg-[#64748B]  opacity-70 mt-1  "></div>
              <p className="px-3 text-[12px] ">Or</p>{" "}
              <div className="w-full h-[0.5px] bg-[#64748B]  opacity-70 mt-1"></div>
            </div>
            <GoogleSignInButton />

            <h5 className="text-center pt-4 font-Poppins text-[16px] text-black">
              Not have any account?{" "}
              <span
                className="text-[#2190ff] pl-1 cursor-pointer"
                onClick={() => router.push("/registration")}
              >
                Sign up
              </span>
            </h5>
          </form>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Login;
