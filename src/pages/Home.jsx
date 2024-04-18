import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import axios from "axios";
import toast from "react-hot-toast";
import Category from "../components/Category";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5; // Assuming your backend supports pagination by limit only

  async function fetchProductData() {
    setLoading(true);

    try {
      const res = await axios.get(`https://fakestoreapi.com/products`);

      setPosts(res.data);
    } catch (error) {
      console.log("Error ", error.message);
      setPosts([]);
    }
    setLoading(false);
  }

  async function fetchCategoryData() {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategories(response.data);
    } catch (error) {
      toast.error("Error fetching category data");
    }
  }

  async function onSelectCategory(category) {
    try {
      let response;

      if (!category) {
        response = await axios.get(`https://fakestoreapi.com/products`);
        setCurrentPage(1);
      } else {
        response = await axios.get(
          `https://fakestoreapi.com/products/category/${category}`
        );
        setCurrentPage(1);
      }
      setPosts(response.data);
    } catch (error) {
      toast.error("Error fetching category data");
    }
  }

  useEffect(() => {
    fetchProductData();
    fetchCategoryData();
  }, []);

  const sortAscending = () => {
    const sortedPosts = [...posts].sort((a, b) => (a.price > b.price ? 1 : -1));
    setPosts(sortedPosts);
    setSortOrder("asc");
  };

  const sortDescending = () => {
    const sortedPosts = [...posts].sort((a, b) => (a.price < b.price ? 1 : -1));
    setPosts(sortedPosts);
    setSortOrder("desc");
  };

  // Calculate start and end index for pagination
  const startIndex = (currentPage - 1) * limit;
  const endIndex = currentPage * limit;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-1">
          <div className="h-screen bg-gray-50">
            <Category
              categories={categories}
              onSelectCategory={onSelectCategory}
            />

            <div className="p-2 rounded-lg hover:bg-gray-100 ">
              <div className="mb-2">
              <labe className="">Price Filter</labe>
              </div>
              <div className="flex flex-col items-center ">
                <div className="flex gap-2 justify-center items-center">
                  <input
                    type="radio"
                    id="ascending"
                    name="priceSort"
                    className="cursor-pointer"
                    value="ascending"
                    onChange={sortAscending}
                  />
                  <label htmlFor="ascending">Price: Low to High</label>
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <input
                    type="radio"
                    id="descending"
                    name="priceSort"
                    value="descending"
                    className="cursor-pointer"
                    onChange={sortDescending}
                  />
                  <label htmlFor="descending">Price: High to Low</label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center -mt-5 flex-grow ">
            {loading ? (
              <Spinner />
            ) : currentPosts.length > 0 ? (
              <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-18 space-x-5 min-h[80vh] ">
                {currentPosts.map((post) => (
                  <Product key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <p>No Data Found</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-around mb-6">
          <div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Previous
            </button>
          </div>
          <div>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
