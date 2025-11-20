// src/pages/admin/AdminTrendingProduct.jsx
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { database } from "../../../Firebase";
import { ref, update, get, set, remove, onValue } from "firebase/database";

// Cloudinary config (keep same as you used before)
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dthgvzk7v/image/upload";
const UPLOAD_PRESET = "glowthic";

/**
 * TrendingManager - form component for Add / Edit trending product
 * Props:
 *  - onSubmit(product)
 *  - onCancel()
 *  - initialData (object) || null
 *  - newId (number) when adding
 */
const TrendingManager = ({ onSubmit, onCancel, initialData, newId }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [link, setLink] = useState(initialData?.link || "");
  const [imageURL, setImageURL] = useState(initialData?.image || "");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // When initialData changes (edit -> open), set fields
    setTitle(initialData?.title || "");
    setPrice(initialData?.price || "");
    setLink(initialData?.link || "");
    setImageURL(initialData?.image || "");
    setImageFile(null);
    setUploading(false);
  }, [initialData]);

  const uploadToCloudinary = async () => {
    // if no new file chosen, return existing URL
    if (!imageFile) return imageURL;
    setUploading(true);
    try {
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
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      setUploading(false);
      return imageURL; // fallback
    }
  };

  const handleSubmit = async () => {
    if (!title || !price || (!imageURL && !imageFile)) {
      alert("Please fill all fields");
      return;
    }
    let finalImage = imageURL;
    if (imageFile) {
      finalImage = await uploadToCloudinary();
    }

    const product = {
      // id will be set by parent (either existing id for edit or newId for add)
      title,
      price,
      image: finalImage,
      link,
    };

    onSubmit(product);
  };

  return (
    <div
      style={{
        background: "#D4AF37",
        padding: "30px",
        marginTop: "30px",
        borderRadius: "20px",
        width: "55%",
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
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />
      </label>

      <label style={formLabel}>
        Link :
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={inputStyle}
        />
      </label>

      <label style={formLabel}>
        Image :
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) {
              setImageFile(f);
              // preview quickly
              const reader = new FileReader();
              reader.onload = (ev) => setImageURL(ev.target.result);
              reader.readAsDataURL(f);
            }
          }}
          style={{
            ...inputStyle,
            paddingTop: "6px",
            paddingLeft: "8px",
            border: "1px solid white",
            height: "40px",
          }}
        />
      </label>

      {uploading && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          Uploading to Cloudinary… please wait
        </p>
      )}

      {/* Preview */}
      {imageURL && (
        <div style={{ marginTop: 12 }}>
          <img
            src={imageURL}
            alt="preview"
            style={{
              width: 120,
              height: 80,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </div>
      )}

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        <button
          onClick={handleSubmit}
          style={{
            padding: "12px 25px",
            background: "#7d0a0a",
            color: "#fff",
            borderRadius: "10px",
            width: "120px",
          }}
        >
          Save
        </button>

        <button
          onClick={onCancel}
          style={{
            padding: "12px 25px",
            background: "#7d0a0a",
            color: "#fff",
            borderRadius: "10px",
            width: "120px",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const AdminTrendingProduct = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductId, setNewProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Listen to trendingProducts (we expect numeric keys)
  useEffect(() => {
    const productsRef = ref(database, "trendingProducts");
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsArray = Object.entries(data)
          .map(([key, value]) => ({ id: parseInt(key, 10), ...value }))
          .sort((a, b) => a.id - b.id);
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Generate next available numeric ID (fill gaps)
  const handleAddClick = async () => {
    const productsRef = ref(database, "trendingProducts");
    const snapshot = await get(productsRef);
    let nextId = 1;
    if (snapshot.exists()) {
      const productsData = snapshot.val();
      const existingIds = Object.keys(productsData)
        .map((id) => parseInt(id, 10))
        .filter((n) => !isNaN(n))
        .sort((a, b) => a - b);

      // find first missing integer
      for (let i = 1; i <= existingIds.length; i++) {
        if (!existingIds.includes(i)) {
          nextId = i;
          break;
        }
      }
      if (existingIds.length === 0) nextId = 1;
      else if (nextId <= existingIds.length) nextId = existingIds.length + 1;
    }
    setNewProductId(nextId);
    setShowForm(true);
    setEditingProduct(null);
  };

  // Add or update product (parent handler)
  const handleFormSubmit = async (productData) => {
    if (editingProduct) {
      // Update existing (editingProduct.id is numeric)
      const productRef = ref(database, `trendingProducts/${editingProduct.id}`);
      await set(productRef, { ...productData, id: editingProduct.id });
    } else {
      // Add new product with numeric ID (newProductId)
      const productRef = ref(database, `trendingProducts/${newProductId}`);
      await set(productRef, { ...productData, id: newProductId });
    }

    setShowForm(false);
    setEditingProduct(null);
    setNewProductId(null);
  };

  // Delete and reindex IDs contiguous 1..N
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    const productRef = ref(database, `trendingProducts/${id}`);
    await remove(productRef);

    // Reindex: read all, sort by numeric key, clear and reinsert with new numeric IDs
    const productsRef = ref(database, "trendingProducts");
    const snapshot = await get(productsRef);
    if (snapshot.exists()) {
      const productsData = snapshot.val();
      // Convert entries to array and sort by current numeric key
      const sortedEntries = Object.entries(productsData)
        .map(([k, v]) => ({ key: parseInt(k, 10), value: v }))
        .sort((a, b) => a.key - b.key);

      // Clear old data
      await set(productsRef, null);

      // Reinsert with new IDs starting from 1
      let newIndex = 1;
      for (const entry of sortedEntries) {
        const value = { ...entry.value, id: newIndex };
        // Use update to add each record
        await update(ref(database, `trendingProducts/${newIndex}`), value);
        newIndex++;
      }
    }
  };

  return (
    <div
      className="admin-container"
      style={{
        paddingLeft: "300px",
        paddingRight: "5%",
        marginTop: "130px",
        fontFamily: "serif",
      }}
    >
      <h1>TRENDING PRODUCTS</h1>

      {/* Top Bar */}
      <div
        className="admin-topbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          zIndex: 10,
        }}
      >
        <input
          type="text"
          placeholder="Search…"
          className="admin-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            height: "45px",
            width: "320px",
            border: "1px solid #7d0a0a",
            borderRadius: "10px",
            padding: "0 15px",
            fontSize: "16px",
            background: "#e3e1e1",
            zIndex: 10,
            maxWidth: "320px",
          }}
        />

        <button
          className="admin-add-button"
          onClick={handleAddClick}
          style={{
            background: "#D4AF37",
            color: "white",
            width: "200px",
            height: "50px",
            border: "none",
            borderRadius: "10px",
            fontSize: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            zIndex: 10,
          }}
        >
          <AddIcon style={{ fontSize: 24 }} />
          Add
        </button>
      </div>

      {/* Product Form */}
      {showForm && (
        <TrendingManager
          onSubmit={(product) => {
            // when adding, include the newId; when editing, parent will use editingProduct.id
            if (editingProduct) {
              handleFormSubmit(product);
            } else {
              // attach id on parent write
              handleFormSubmit(product);
            }
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
            setNewProductId(null);
          }}
          initialData={editingProduct}
          newId={newProductId}
        />
      )}

      {/* Product List */}
      <div>
        {products
          .filter((item) => {
            const title = item.title ? item.title.toLowerCase() : "";
            const link = item.link ? item.link.toLowerCase() : "";
            const search = searchTerm.toLowerCase();
            return title.includes(search) || link.includes(search);
          })
          .sort((a, b) => b.id - a.id) // newest (highest id) first
          .map((item) => (
            <div
              key={item.id}
              className="product-card"
              style={{
                minHeight: "100px",
                width: "100%",
                borderRadius: "10px",
                background: "#7d0a0a",
                marginTop: "40px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <div
                className="product-info"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "20px",
                  gap: "20px",
                }}
              >
                <img
                  src={item.image}
                  alt="product"
                  className="product-img"
                  style={{
                    height: "80px",
                    width: "100px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <div
                  className="product-title"
                  style={{ lineHeight: "1.2", color: "white" }}
                >
                  <h1 style={{ margin: 0 }}>{item.title}</h1>
                  <h3 style={{ margin: 0, color: "yellow" }}>₹{item.price}</h3>
                </div>
              </div>

              <div
                className="product-actions"
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  padding: "20px",
                  paddingRight: "40px",
                }}
              >
                <button
                  onClick={() => {
                    setEditingProduct(item);
                    setShowForm(true);
                    // ensure form picks up latest item values
                  }}
                  style={{
                    background: "white",
                    color: "#7d0a0a",
                    width: "100px",
                    height: "50px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "16px",
                  }}
                >
                  <EditIcon style={{ fontSize: 20 }} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    background: "white",
                    color: "#7d0a0a",
                    width: "100px",
                    height: "50px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "16px",
                  }}
                >
                  <DeleteIcon style={{ fontSize: 20 }} />
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Responsive styles (same as AdminBrands) */}
      <style>
        {`
          @media (max-width: 768px) {
            .admin-container {
              padding-left: 250px;
              padding-right: 5%;
            }
            .admin-topbar {
              flex-direction: column;
              gap: 15px;
              align-items: flex-start !important;
            }
            .admin-search-input {
              width: 100% !important;
              max-width: 320px !important;
              margin-bottom: 10px !important; 
            }
            .admin-add-button {
              width: 100% !important;
              justify-content: center;
            }
            .product-card {
              flex-direction: column;
              height: auto !important;
            }
            .product-info {
              flex-direction: column;
              align-items: flex-start !important;
              gap: 10px;
            }
            .product-actions {
              padding-right: 0 !important;
              justify-content: flex-start;
              gap: 10px !important;
              flex-wrap: wrap;
            }
            .product-actions button {
              width: 48% !important;
            }
            .product-title h1 {
              font-size: 20px;
            }
            .product-title h3 {
              font-size: 16px;
            }
            img.product-img {
              width: 80px !important;
              height: 80px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

// shared styles
const formLabel = {
  display: "flex",
  gap: "20px",
  fontSize: "20px",
  fontWeight: "bold",
  color: "#7d0a0a",
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

export default AdminTrendingProduct;
