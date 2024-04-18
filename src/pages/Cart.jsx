import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import Spinner from "../components/Spinner";
import {cartEmpty} from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.currentUser);
  const navigate = useNavigate();

  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const amount = cart.reduce((acc, curr) => acc + curr.price, 0);
      setTotalAmount(amount);
    }
    setLoading(false);
  }, [cart]);

  if (loading) {
    return <Spinner />;
  }

  const checkoutHandler = () => {
    if (users.length === 0) {
      toast.error("Please login to checkout");
      return;
    }
    dispatch(cartEmpty());
    toast.success("Order placed successfully");
    navigate("/")
  }

  return (
    <div>
      {cart && cart.length > 0 ? (
        <div className="flex xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl items-start mt-10 mr-28 mx-auto">
          <div className="flex-col  justify-center items-center ">
            {cart.map((item, index) => (
              <CartItem key={item.id} item={item} itemIndex={index} />
            ))}
          </div>
          <div className=" p-5 mr-20  w-[30%] ">
            <div className="font-bold text-3xl mb-6 text-gray-800">
              Your Cart
            </div>
            <div className="font-bold text-2xl mb-28 text-gray-800">
              Summary
            </div>
            <div>
              <p>
                <span className="font-bold text-gray-800">
                  Total Items: {cart.length}
                </span>
              </p>
            </div>
            <div>
              <span className="font-bold ">
                Total Amount:<p className="text-green-500">${totalAmount}</p>
              </span>
              {/* <button>Check Out</button> */}
            </div>

            <div className="mt-5">
              <button
                className="bg-gray-500 hover:scale-90 transition duration-75 text-white font-bold py-2 px-4 rounded"
                onClick={checkoutHandler}
              >
                Check out
              </button>
            </div>


          </div>
        </div>
      ) : (
        <div className=" flex flex-col mt-80 justify-center items-center  ">
          <h1 className="text-3xl text-gray-800 mb-5">Cart is Empty</h1>
          <Link className="text-2xl border-sm border text-gray-800" to="/">
            Show Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
