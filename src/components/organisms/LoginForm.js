import { useForm } from "react-hook-form";
import { Facebook, Google } from "../atoms/Icon";
import { InputForm } from "../atoms/Input";
import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { LoginCustomer, SignupCustomer, SignupGoogle } from "../../utils/auth";
import { useRouter } from "next/router";
import { handleGoogleSignUp } from "../../utils/firebase";

export const LoginForm = ({ isShowLogin, setIsShowLogin }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [create, setCreate] = useState(false);

  const handleLogin = async (d) => {
    const loginData = {
      customer_name: d.username,
      customer_password: d.password,
    };
    try {
      await LoginCustomer(loginData);
      setIsShowLogin(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async (d) => {
    const signupData = {
      customer_name: d.username,
      customer_password: d.password,
      customer_fullname: d.fullname,
    };
    try {
      await SignupCustomer(signupData);
      setIsShowLogin(false);
      setCreate(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLogin = () => {
    setIsShowLogin(!isShowLogin);
  };

  const handleSignUpGoogle = async () => {
    try {
      const user = await handleGoogleSignUp();
      const payload = {
        customer_name: user.email,
        customer_password: user.uid,
        customer_fullname: user.displayName,
      };
      await SignupGoogle(payload);
      setIsShowLogin(false);
    } catch (error) {
      console.error("Error during Google Sign-Up:", error);
    }
  };

  return (
    <>
      {/* <!--==================== LOGIN ====================--> */}
      <div className={`login ${isShowLogin ? "show-login" : ""}`} id="login">
        <form
          action=""
          className="login__form"
          onSubmit={handleSubmit(create ? handleSignup : handleLogin)}
        >
          <h2 className="login__title">{create ? "Signup" : "Signin"}</h2>

          <div className="login__group">
            {create ? (
              <div>
                <label htmlFor="fullname" className="login__label">
                  Full Name
                </label>
                <InputForm
                  register={register("fullname", {
                    required: "full name cannot be left blank",
                  })}
                  type="text"
                  placeholder={"fullname"}
                />
                {errors.fullname && errors.fullname.type === "required" && (
                  <span className="text-red text-xs italic">
                    {errors.fullname.message}
                  </span>
                )}
              </div>
            ) : null}

            <div>
              <label htmlFor="email" className="login__label">
                Email
              </label>
              <InputForm
                register={register("username", {
                  required: "username cannot be left blank",
                })}
                type="text"
                placeholder={"username"}
              />
              {errors.username && errors.username.type === "required" && (
                <span className="text-red text-xs italic">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="password" className="login__label">
                Password
              </label>
              <InputForm
                register={register("password", {
                  required: "password cannot be left blank",
                })}
                type="password"
                placeholder={"password"}
              />
              {errors.password && errors.password.type === "required" && (
                <span className="text-red text-xs italic">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <p className="login__signup">
              {create ? "Already a member? " : "Don't have an account? "}
              <span onClick={() => setCreate(!create)}>
                {create ? "Signin" : "Signup"}
              </span>
            </p>

            <a href="#" className="login__forgot">
              You forgot your password
            </a>

            <button type="submit" className="login__button">
              {create ? "Signup" : "Signin"}
            </button>
          </div>
          <div className="social">
            <button
              type="button"
              className="p-[1rem] flex justify-center items-center gap-2 bg-white rounded-md w-full border border-solid hover:shadow-xl"
              onClick={handleSignUpGoogle}
            >
              <Google className={"h-5"} /> Google
            </button>
          </div>
        </form>

        <span onClick={toggleLogin}>
          <AiOutlineClose className="login__close" id="login-close" />
        </span>
      </div>
    </>
  );
};
