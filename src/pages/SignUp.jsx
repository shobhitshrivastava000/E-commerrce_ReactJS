import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/Slices/UserSlice";
const SignUp = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const users = useSelector((state) =>  state.currentUser);
    const dispatch = useDispatch();

  const onSubmit = (data) => {
    
    const passwordregex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordregex.test(data.password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character"
      );
      return;
    }
    const existingUser = users?.find((user) => data.email === user.email);
    if (existingUser) {
      toast.error("Email already exists");
      return;
    }
    if (data.password !== data.cpassword) {
      toast.error("Passwords do not match");
      return;
    }
    const newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
      cpassword: data.cpassword,
    };

    dispatch(setUser(newUser));

    toast.success("Account created successfully");
    navigate("/login");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-sm mx-auto  mb-4 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 p-4 mt-14">
          <h4 className="text-2xl font-bold dark:text-whit pb-3 text-center">
            Sign Up Form
          </h4>
          <div className="mb-3">
            <label
              for="fname"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Username
            </label>
            <input
              type="text"
              id="fname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Username"
              required
              {...register("username")}
            />
          </div>
          <div className="mb-3">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="email"
              {...register("email")}
              required
            />
          </div>
          <div className="mb-3">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="password"
              {...register("password")}
              required
            />
          </div>
          <div className="mb-3">
            <label
              for="cpassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="cpassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="confirm password"
              {...register("cpassword")}
              required
            />
          </div>
          <div className="flex items-start mb-3">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                required
              />
            </div>
            <label
              for="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <input
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 align-center"
          ></input>
          <div className="flex items-start p-3">
            <p
              for="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Already have a member?{" "}
              <Link to="/login" className="text-blue-500">
                log in
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SignUp;