import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/Slices/CurrentUserSlice";
import { toast } from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  console.log(users);
  const onSubmit = (data) => {
    const existingUser = users.find((user) => data.email === user.email);

    if (existingUser) {
      if (data.password === existingUser.password) {
        dispatch(addUser(existingUser));
        navigate("/");
        toast.success("login successfully");
      } else {
        toast.error("Invalid Password");
      }
    } else {
      toast.error("Invalid Email");
    }
  };
  return (
    <div className="">
      <div className="flex justify-center items-center mt-52">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-sm mx-auto  mb-4 border border-gray-200 rounded-lg bg-white dark:bg-gray-700 p-4 mt-14">
            <div className="py-4" >
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                {...register("email")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="py-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                {...register("password")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="py-4">
              <input
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
               focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 align-center"
              ></input>
            </div>
            <div>
              <div className="flex items-start p-3">
                <p
                  for="remember"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Not a member?{" "}
                  <Link to="/signup" className="text-blue-500">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
