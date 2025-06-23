import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCategories } from "../../api/Categories";

const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data || []))
      .catch((err) => {
        console.error(err);
        setError("Failed to load categories");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Browse by category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <NavLink
            key={cat.id}
            to={`/category/${cat.slug}`}
            className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition duration-300 block"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{cat.name}</h3>
                <p className="text-gray-500 text-sm">
                  {cat.productCount} products
                </p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default CategoryFilter;
