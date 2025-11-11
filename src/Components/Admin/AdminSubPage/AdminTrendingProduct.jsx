import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { database } from "../../../Firebase";
import { ref, update, remove, onValue, push } from "firebase/database";

const AdminTrendingProduct = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [productLink, setProductLink] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [uploading, setUploading] = useState(false);

  const CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/dthgvzk7v/image/upload";
  const UPLOAD_PRESET = "glowthic";

  // ✅ Auto-fetch products
  useEffect(() => {
    const trendingRef = ref(database, "trendingProducts");

    return onValue(trendingRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setProducts(arr);
      } else {
        setProducts([]);
      }
    });
  }, []);

  // ✅ Upload to Cloudinary
  const uploadToCloudinary = async () => {
    if (!imageFile) return imageURL;

    setUploading(true);

    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: data,
    });

    const file = await res.json();
    setUploading(false);

    return file.secure_url;
  };

  // ✅ Save Product
  const handleFormSubmit = async () => {
    if (!title || !price || (!imageURL && !imageFile)) {
      alert("Please fill all fields");
      return;
    }

    let finalImage = imageURL;

    if (imageFile) {
      finalImage = await uploadToCloudinary();
    }

    const productData = {
      title,
      price,
      image: finalImage,
      link: productLink,
      active: true,
    };

    if (editingProduct) {
      await update(
        ref(database, `trendingProducts/${editingProduct.id}`),
        productData
      );
    } else {
      await push(ref(database, "trendingProducts"), productData);
    }

    alert("Saved successfully!");
    resetForm();
  };

  // ✅ Reset form
  const resetForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setTitle("");
    setPrice("");
    setImageURL("");
    setImageFile(null);
    setUploading(false);
  };

  return (
    <div
      style={{ paddingLeft: "300px", paddingRight: "5%", marginTop: "110px" }}
    >
      <h1>Trending Products</h1>

      {/* ✅ Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            height: "45px",
            width: "320px",
            border: "1px solid #D63384",
            borderRadius: "10px",
            padding: "0 15px",
            background: "#e3e1e1",
          }}
        />

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          style={{
            background: "#D63384",
            color: "white",
            width: "200px",
            height: "50px",
            borderRadius: "10px",
            fontSize: "20px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <AddIcon /> Add
        </button>
      </div>

      {/* ✅ Add/Edit Form */}
      {showForm && (
        <div
          style={{
            background: "pink",
            padding: "30px",
            marginTop: "30px",
            borderRadius: "20px",
            width: "50%",
          }}
        >
          <label style={formLabel}>
            Title :
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />
          </label>

          <label style={formLabel}>
            Price :
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={inputStyle}
            />
          </label>

          <label style={formLabel}>
            Image :
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              style={{ ...inputStyle, width: "400px", background: "white" }}
            />
          </label>

          <label style={formLabel}>
            Link :
            <input
              type="text"
              value={productLink}
              onChange={(e) => setProductLink(e.target.value)}
              style={inputStyle}
            />
          </label>

          {/* ✅ Uploading Message */}
          {uploading && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              Uploading to Cloudinary… please wait
            </p>
          )}

          {/* ✅ Buttons */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            <button
              onClick={handleFormSubmit}
              style={{
                padding: "12px 25px",
                background: "#D63384",
                color: "#fff",
                borderRadius: "10px",
                width: "120px",
              }}
            >
              Save
            </button>

            <button
              onClick={resetForm}
              style={{
                padding: "12px 25px",
                background: "#D63384",
                color: "#fff",
                borderRadius: "10px",
                width: "120px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ✅ Product List */}
      <div>
        {products
          .filter((p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .reverse()
          .map((item) => (
            <div
              key={item.id}
              style={{
                minHeight: "100px",
                width: "100%",
                background: "#D63384",
                borderRadius: "10px",
                padding: "10px",
                marginTop: "40px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
                <img
                  src={item.image}
                  style={{
                    width: "120px",
                    height: "80px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />

                <div>
                  <p style={{ color: "white", fontSize: "18px" }}>
                    {item.title}
                  </p>
                  <p style={{ color: "yellow", fontSize: "16px" }}>
                    ₹{item.price}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "15px" }}>
                <button
                  onClick={() => {
                    setEditingProduct(item);
                    setTitle(item.title);
                    setPrice(item.price);
                    setImageURL(item.image);
                    setProductLink(item.link || ""); // ✅ yeh map ke andar hona chahiye
                    setShowForm(true);
                  }}
                  style={editBtn}
                >
                  <EditIcon /> Edit
                </button>

                <button
                  onClick={() =>
                    remove(ref(database, `trendingProducts/${item.id}`))
                  }
                  style={deleteBtn}
                >
                  <DeleteIcon /> Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const formLabel = {
  display: "flex",
  gap: "20px",
  fontSize: "20px",
  fontWeight: "bold",
  color: "#D63384",
  marginTop: "15px",
  alignItems: "center",
};

const inputStyle = {
  width: "400px",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #d4a373",
  marginBottom: "12px",
};

const editBtn = {
  background: "white",
  color: "#D63384",
  width: "90px",
  height: "45px",
  borderRadius: "10px",
  border: "none",
  marginTop: "25px",
};

const deleteBtn = {
  background: "white",
  color: "#D63384",
  width: "90px",
  height: "45px",
  borderRadius: "10px",
  border: "none",
  marginTop: "25px",
};

export default AdminTrendingProduct;
