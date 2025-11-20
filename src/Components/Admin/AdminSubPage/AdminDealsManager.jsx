import React, { useState, useEffect } from "react";
import { database } from "../../../Firebase";
import { ref, onValue, push, set, remove } from "firebase/database";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminDealsManager = ({ category }) => {
  const [deals, setDeals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ image: "", link: "", heading: "" });

  const categoriesList = [
    "makeup",
    "hair",
    "skin",
    "fragnance",
    "bath&hyginie",
    "appliances",
  ];

  // ✅ ALWAYS SAFE
  const [selectedCategory, setSelectedCategory] = useState(
    category || "makeup"
  );

  // ✅ Load Deals from Firebase
  useEffect(() => {
    const dealsRef = ref(database, `adminDeals/${selectedCategory}`);

    onValue(dealsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const arr = Object.keys(data).map((id) => ({ id, ...data[id] }));
        setDeals(arr);
      } else {
        setDeals([]);
      }
    });
  }, [selectedCategory]);

  // ✅ Upload Image
  const uploadToCloudinary = async (file) => {
    if (!file) return "";

    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", "glowthic");
    fd.append("cloud_name", "dthgvzk7v");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dthgvzk7v/image/upload",
      {
        method: "POST",
        body: fd,
      }
    );

    const data = await res.json();
    return data.secure_url; // ✅ CLOUDINARY IMAGE URL
  };

  // ✅ Save or Update Deal
  const saveDeal = async () => {
    if (!form.image || !form.link) {
      alert("Please upload image and add link!");
      return;
    }

    if (editId) {
      await set(
        ref(database, `adminDeals/${selectedCategory}/${editId}`),
        form
      );
      alert("Deal Updated ✅");
    } else {
      const dealRef = push(ref(database, `adminDeals/${selectedCategory}`));
      await set(dealRef, form);
      alert("Deal Added ✅");
    }

    setEditId(null);
    setForm({ image: "", link: "", heading: "" });
    setShowForm(false);
  };

  // ✅ Delete Deal
  const handleDelete = (id) => {
    remove(ref(database, `adminDeals/${selectedCategory}/${id}`));
    alert("Deleted ✅");
  };

  return (
    <div
      style={{ marginLeft: "280px", marginTop: "140px", fontFamily: "serif" }}
    >
      <h1 style={{ textTransform: "uppercase" }}>
        {selectedCategory} DEALS MANAGER
      </h1>
      {/* ✅ CATEGORY DROPDOWN */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            borderRadius: "8px",
            border: "2px solid #D4AF37",
            fontSize: "16px",
            fontWeight: "600",
            color: "#7d0a0a",
            width: "200px",
            height: "50px",
          }}
        >
          {categoriesList.map((cat) => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setForm({ image: "", link: "", heading: "" });
          }}
          style={{
            background: "#D4AF37",
            color: "#fff",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            marginRight: "40px",
            width: "10%",
            height: "50px",
          }}
        >
          + Add Deal
        </button>
      </div>

      {/* ✅ Form */}
      {showForm && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              background: "#D4AF37",
              padding: "20px",
              borderRadius: "12px",
              width: "550px",
              border: "2px solid #f0d6b4",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "#7d0a0a",
                fontWeight: "bold",
              }}
            >
              {editId ? "Edit Deal" : "Add New Deal"}
            </h2>

            <label
              style={{ color: "#7d0a0a", fontSize: "20px", fontWeight: "bold" }}
            >
              {" "}
              Heading
              <input
                type="text"
                value={form.heading}
                onChange={(e) => setForm({ ...form, heading: e.target.value })}
                style={{ width: "100%", padding: "10px", borderRadius: "10px" }}
              />
            </label>
            {/* Link */}
            <label
              style={{ color: "#7d0a0a", fontSize: "20px", fontWeight: "bold" }}
            >
              Link:
              <input
                type="text"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                style={{ width: "100%", padding: "10px", borderRadius: "10px" }}
              />
            </label>

            {/* Image Upload */}
            <label
              style={{
                marginTop: "15px",
                color: "#7d0a0a",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Image:
              <input
                type="file"
                onChange={async (e) => {
                  const url = await uploadToCloudinary(e.target.files[0]);
                  setForm({ ...form, image: url });
                }}
                style={{ width: "100%", padding: "8px", borderRadius: "8px" }}
              />
            </label>

            {form.image && (
              <img
                src={form.image}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              />
            )}

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={saveDeal}
                style={{
                  background: "#7d0a0a",
                  color: "white",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "none",
                  width: "30%",
                }}
              >
                {editId ? "Update" : "Save"}
              </button>

              <button
                onClick={() => setShowForm(false)}
                style={{
                  background: "#7d0a0a",
                  color: "white",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "none",
                  width: "30%",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Deals List */}
      <div style={{ marginTop: "30px" }}>
        {deals.map((item) => (
          <div
            key={item.id}
            style={{
              width: "95%",
              borderRadius: "16px",
              background: "#7d0a0a",
              margin: "25px auto",
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* LEFT SECTION */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <img
                  src={item.image}
                  alt="deal"
                  style={{
                    height: "90px",
                    width: "110px",
                    borderRadius: "12px",
                    objectFit: "cover",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                />

                <div>
                  <p
                    style={{
                      margin: 0,
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "500",
                      maxWidth: "250px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.heading}
                  </p>
                </div>
              </div>

              {/* BUTTONS */}
              <div style={{ display: "flex", gap: "15px" }}>
                <button
                  onClick={() => {
                    setEditId(item.id);
                    setForm({
                      image: item.image,
                      link: item.link,
                      heading: item.heading,
                    });

                    setShowForm(true);
                  }}
                  style={{
                    background: "white",
                    color: "#7d0a0a",
                    height: "45px",
                    width: "95px",
                    borderRadius: "10px",
                    border: "none",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  }}
                >
                  <EditIcon /> Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    background: "white",
                    color: "#7d0a0a",
                    height: "45px",
                    width: "95px",
                    borderRadius: "10px",
                    border: "none",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  }}
                >
                  <DeleteIcon /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDealsManager;
