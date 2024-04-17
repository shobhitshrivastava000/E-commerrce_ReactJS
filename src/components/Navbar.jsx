import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/Slices/CurrentUserSlice";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const users = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  return (
    <div>
      <nav className="flex  justify-between items-center h-20 max-w-6xl mx-auto ">
        <NavLink to="/">
          <div className="ml-5 text-2xl text-gray-400">
            {/* <img src="" alt="logo" /> */}
            <h1>ZigShop</h1>
          </div>
        </NavLink>

        <div className="flex items-center justify-between text-1xl font-medium text-slate-100 mr-5 space-x-5">
          {users.length === 0 && (
            <NavLink to="/signup">
              <div className="ml-5 text-lg text-gray-400">
                <h1>SignUp</h1>
              </div>
            </NavLink>
          )}
          {users.length === 0 && (
            <NavLink to="/login">
              <div className="ml-5 text-lg text-gray-400">
                <h1>login</h1>
              </div>
            </NavLink>
          )}
          {users.length > 0 && (
            <NavLink to="/cart">
              <div className="relative">
                {cart.length > 0 && (
                  <span className="abosulte -top-1 -right-2 bg-green-600 justify-center items-center text-white text-xs w-6 h-6 rounded-full flex ">
                    {cart.length}
                  </span>
                )}
                <FaShoppingCart className="text-2xl" />
              </div>
            </NavLink>
          )}
          {users.length > 0 && (
            <NavLink to="/login" onClick={() => dispatch(removeUser())}>
              <div className="ml-5 text-lg text-gray-400">
                <h1>logout</h1>
              </div>
            </NavLink>
          )}

          
          
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
