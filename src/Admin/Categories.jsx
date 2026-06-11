import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("ACTIVE");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [search, categories]);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:4000/api/categories/admin/all"
      );

      setCategories(res.data);
      setFilteredCategories(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:4000/api/categories/${editingId}`,
          { name, status }
        );
      } else {
        await axios.post(
          "http://localhost:4000/api/categories",
          { name }
        );
      }

      setName("");
      setStatus("ACTIVE");
      setEditingId(null);

      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setName(cat.name);
    setStatus(cat.status);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await axios.delete(
        `http://localhost:4000/api/categories/${id}`
      );

      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Category Management
        </h2>

        <div className="bg-red-600 text-white px-4 py-2 rounded-lg">
          Total Categories: {categories.length}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow rounded-xl p-5 mb-6">
        <h3 className="font-semibold text-lg mb-4">
          {editingId ? "Edit Category" : "Add New Category"}
        </h3>

        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-3"
        >
          <input
            type="text"
            className="border rounded-lg px-4 py-2 flex-1"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {editingId && (
            <select
              className="border rounded-lg px-4 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          )}

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setName("");
                setStatus("ACTIVE");
              }}
              className="bg-gray-500 text-white px-5 py-2 rounded-lg"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Search */}
      <div className="bg-white shadow rounded-xl p-4 mb-4">
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* Table Card */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading categories...
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-500"
                  >
                    No categories found
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat, index) => (
                  <tr
                    key={cat.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3">{index + 1}</td>

                    <td className="p-3 font-medium">
                      {cat.name}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          cat.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {cat.status}
                      </span>
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}