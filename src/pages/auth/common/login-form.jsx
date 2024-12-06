import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useDispatch } from "react-redux";
import { isLogin } from "@/store/features/Login/loginSlice";
import { toast } from "react-toastify";
import { fetchAuthPost, postAPI } from "@/store/api/apiSlice";

const schema = yup
  .object({
    username: yup.string().required("Username is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log(data)

    try {
     
      const response = await fetchAuthPost("https://api.dyzo.ai/super/superuser-login/", {body : data});

      

      if (response.status) {
        // Handle successful login
        sessionStorage.setItem("isLogin", true);
        dispatch(isLogin());
        navigate("/dashboard");
        toast.success("Login Successful");
      } else {
        // Handle API error
        throw new Error(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      // Handle network or other errors
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Username Field */}
      <Textinput
        name="username"
        label="Username"
        type="text"
        register={register}
        defaultValue="admin"
        error={errors.username}
        className="h-[48px]"
      />

      {/* Password Field */}
      <Textinput
        name="password"
        label="Password"
        type="password"
        register={register}
        defaultValue="jpr@DEC12"
        error={errors.password}
        className="h-[48px]"
      />

      {/* Submit Button */}
      <Button
        type="submit"
        text="Sign In"
        className="btn btn-dark block w-full text-center"
        isLoading={isLoading}
      />
    </form>
  );
};

export default LoginForm;
