"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { styles } from "../../../app/styles/style";
// import { useSignupMutation } from "@/redux/features/auth/authApi";
import GoogleSignInButton from "./GoogleSignInButton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSignupMutation } from "@/redux/api/authApi";

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Signup: React.FC = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = useState(false);
  const [signup, { data, error, isSuccess, isLoading }] = useSignupMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      enqueueSnackbar(message, { variant: "success" });

      router.push("/login");
    }
    if (error) {
      if ("data" in error) {
        enqueueSnackbar("something is wrong try again", { variant: "error" });
      }
    }
  }, [isSuccess, error, enqueueSnackbar, router]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const newUser = {
        name,
        email,
        password,
      };
      await signup(newUser);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full  bg-[#e1e5eb]  h-screen pb-10 flex justify-center items-center">
      <div className=" w-full">
        <h1
          className={`text-[32px] leading-[38px] text-[#384252]  dark:text-white font-[600]  font-poppins text-center py-3`}
        >
          Sign Up
        </h1>
        <div className="w-[30%] mx-auto bg-white  p-10  rounded-md">
          <form onSubmit={handleSubmit}>
            <div className=" mb-4">
              <label className={`${styles.label}`} htmlFor="email">
                Enter your Name
              </label>
              <input
                type="text"
                name=""
                value={values.name}
                onChange={handleChange}
                id="name"
                placeholder="tanwir"
                className={`${
                  errors.name && touched.name && "border-red-500"
                } ${styles.input}`}
              />
              {errors.name && touched.name && (
                <span className="text-red-500  block">{errors.name}</span>
              )}
            </div>
            <label className={`${styles.label}`} htmlFor="email">
              Enter your Email
            </label>
            <input
              type="email"
              name=""
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="xyz@gmail.com"
              className={`${
                errors.email && touched.email && "border-red-500"
              } ${styles.input}`}
            />
            {errors.email && touched.email && (
              <span className="text-red-500 pt-2 block">{errors.email}</span>
            )}
            <div className="w-full mt-4 relative mb-1">
              <label className={`${styles.label}`} htmlFor="email">
                Enter your password
              </label>
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
                  className="absolute bottom-3 right-2 z-1 cursor-pointer dark:text-white text-black opacity-90"
                  size={20}
                  onClick={() => setShow(true)}
                />
              ) : (
                <AiOutlineEye
                  className="absolute bottom-3 right-2 z-1 cursor-pointer dark:text-white text-black opacity-90"
                  size={20}
                  onClick={() => setShow(false)}
                />
              )}
            </div>
            {errors.password && touched.password && (
              <span className="text-red-500 pt-2 block">{errors.password}</span>
            )}
            <div className="w-full mt-5">
              <button
                type="submit"
                value="Sign Up "
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
                  "Sign Up"
                )}
              </button>
            </div>
            <div className="flex items-center justify-center my-2">
              <div className=" w-full h-[0.5px] bg-[#64748B]  opacity-70 mt-1  "></div>
              <p className="px-3 text-[12px] ">Or</p>{" "}
              <div className="w-full h-[0.5px] bg-[#64748B]  opacity-70 mt-1"></div>
            </div>
            <GoogleSignInButton />
            <br />
            <h5 className="text-center pt-4 font-Poppins text-[16px] text-black dark:text-white">
              Already have an account?{" "}
              <span
                className="text-[#2190ff] pl-1 cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Sign In
              </span>
            </h5>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
