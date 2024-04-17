import React from "react";

const Category = ({ categories, onSelectCategory, onSelectAll }) => {
  return (
    <div className="px-3 py-4 overflow-y-full  bg:white">
      <h1 className="space-y-2 font-extrabold m-2 text-2xl">Categories</h1>
      <ul className="space-y-2 font-medium">
        <li
          onClick={() => onSelectCategory(null)}
          className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100  group`}
        >
          All
        </li>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer group`}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
