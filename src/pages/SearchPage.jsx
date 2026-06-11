import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function SearchPage() {

  const [params] = useSearchParams();

  const query =
    params.get("q")?.trim().toLowerCase() || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadProducts = async () => {

      try {

        setLoading(true);

        const res = await axios.get(
          `http://localhost:4000/api/products/search?q=${query}`
        );

        setProducts(res.data || []);

      } catch (err) {

        console.log("Search error:", err);

        setProducts([]);

      } finally {

        setLoading(false);

      }

    };

    if (query) {
      loadProducts();
    }

  }, [query]);

  return (

    <div className="max-w-[1400px] mx-auto px-4 py-8 min-h-screen">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-8">
        Search Results for "{query}"
      </h1>

      {/* LOADING */}
      {loading ? (

        <div className="text-gray-500 text-lg">
          Loading products...
        </div>

      ) : products.length === 0 ? (

        /* EMPTY */
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No products found
          </h2>

          <p className="text-gray-500">
            Try searching with another product or category
          </p>

        </div>

      ) : (

        /* PRODUCTS GRID */
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

  {products.map((p) => (

    <div
      key={p.id}
      className="w-full max-w-[220px]"
    >

      <ProductCard p={p} />

    </div>

  ))}

</div>
      )}

    </div>

  );

}