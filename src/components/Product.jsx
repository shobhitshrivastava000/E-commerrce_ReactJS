import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { add, remove } from "../redux/Slices/CartSlice";





const Product = ({ post }) => {
  const cart = useSelector((state) => state.cart);
  const users = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const addToCart = () => {

    if(users.length === 0){
      toast.error("Please Login First");
      return;
    }
    dispatch(add(post));
    toast.success("Item added to Cart");
  };
  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("Item removed from Cart");
  };
  return (
    <div
      className="flex flex-col items-center justify-between border 
    hover:scale-110 transition transform duration-750 mr-1 mt-6 outline
    ease-in rounded gap-3 p-4 ml-5"
    >
      <div>
        <p className="text-gray-500 font-semibold text-lg text-left trucate w-40 mt-1">
          {post.title.split(" ").slice(0, 2).join(" ") + "..."}
        </p>
      </div>
      <div>
        <p className="w-40 text-gray-400 font-normal text-[10px] text-left ">
          {post.description.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
      </div>
      <div className="h-[180px]">
        <img src={post.image} alt="" className="h-full w-full" />
      </div>

      <div className="flex justify-between gap-11 gap-12 items-center w-full">
        <div>
          <p className="text-green-600 font-semibold"> ${post.price}</p>
        </div>

        {cart && cart.some((p) => p.id === post.id) ? (
          <button
            className="text-gray-600 transition  duration-300 font-semibold border-2 border-gray-600 rounded-full text-[10px]
            p-1 px-3 "
            onClick={removeFromCart}
          >
            Remove from Cart
          </button>
        ) : (
          <button
            className="text-gray-600 transition  duration-300 font-semibold border-2 border-gray-600 rounded-full text-[10px]
            p-1 px-3 "
            onClick={addToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
