import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";
const CartItem = ({ item, itemIndex }) => {
  const dispatch = useDispatch();
  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item removed from Cart");
  };

  return (
    <div className="flex-wrap w-[40%] mx-auto mt-10 outline p-5 rounded-lg flex items-center gap-5">
      <div className=" flex gap-5 justify-center items-center ">
        <div className="h-fit w-full">
          <img src={item.image} alt="Product"/>
        </div>
        <div>
          <h1 className="text-xl font-bold">{item.title}</h1>
          <h1 className="text-md">{item.description}</h1>
          <div className="flex justify-between items-center gap-5">
            <p className="font-bold text-green-900">${item.price}</p>
            <div
              className="cursor-pointer border px-3 py-1 rounded-full text-red-400
              hoevr:bg-red-400 hover:text-black border-full text-xl"
              onClick={removeFromCart}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
