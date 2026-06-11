import { useState } from "react";
import axios from "axios";
 
export default function AdminAddSubcategory() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
 
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
 
  const submit = async (e) => {
    e.preventDefault();
 
    if (!name || !categoryId || !image) {
      alert("All fields are required");
      return;
    }
 
    const fd = new FormData();
    fd.append("name", name);
    fd.append("category_id", categoryId);
    fd.append("image", image);
 
    await axios.post(
      "http://localhost:4000/api/subcategories",
      fd
    );
 
    setName("");
    setCategoryId("");
    setImage(null);
    setPreview(null);
 
    alert("Subcategory added");
  };
 
  return (
    <form
      onSubmit={submit}
      className="space-y-4 max-w-md"
    >
      <input
        type="text"
        placeholder="Subcategory Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full"
      />
 
      <input
        type="number"
        placeholder="Category ID"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="border p-2 rounded w-full"
      />
 
      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="border p-2 rounded w-full"
      />
 
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-16 h-16 object-cover rounded"
        />
      )}
 
      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Add Subcategory
      </button>
    </form>
  );
}
 
 