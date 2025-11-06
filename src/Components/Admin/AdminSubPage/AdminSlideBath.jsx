import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { database } from "../../../Firebase";
import { ref, update, get, set, remove, onValue } from "firebase/database";
import SlideManager from "../AdminSubPage/SlideManager.jsx";

const AdminSlideBath = () => {
  const [slides, setSlides] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [newSlideId, setNewSlideId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Auto-fetch all slides from Firebase
  useEffect(() => {
    const slidesRef = ref(database, "slides_bath");
    const unsubscribe = onValue(slidesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const slidesArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setSlides(slidesArray);
      } else {
        setSlides([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Add Button Logic
  const handleAddClick = async () => {
    const slidesRef = ref(database, "slides_bath");
    const snapshot = await get(slidesRef);
    let nextId = 1;

    if (snapshot.exists()) {
      const slidesData = snapshot.val();
      const existingIds = Object.keys(slidesData)
        .map((id) => parseInt(id, 10))
        .sort((a, b) => a - b);

      for (let i = 1; i <= existingIds.length; i++) {
        if (!existingIds.includes(i)) {
          nextId = i;
          break;
        }
      }
      if (nextId <= existingIds.length) nextId = existingIds.length + 1;
    }

    setNewSlideId(nextId);
    setShowForm(true);
    setEditingSlide(null);
  };

  // Handle Add / Edit
  const handleFormSubmit = async (slide) => {
    if (editingSlide) {
      const slideRef = ref(database, `slides_bath/${slide.id}`);
      await set(slideRef, slide);
    } else {
      const slideRef = ref(database, `slides_bath/${newSlideId}`);
      await set(slideRef, { ...slide, id: newSlideId });
    }

    setShowForm(false);
    setEditingSlide(null);
  };

  // Handle Delete + Reindex IDs
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this slide?")) {
      const slideRef = ref(database, `slides_bath/${id}`);
      await remove(slideRef);

      const slidesRef = ref(database, "slides_bath");
      const snapshot = await get(slidesRef);
      if (snapshot.exists()) {
        const slidesData = snapshot.val();
        const sortedEntries = Object.entries(slidesData).sort(
          ([a], [b]) => parseInt(a) - parseInt(b)
        );

        await set(slidesRef, null);

        let newIndex = 1;
        for (const [, value] of sortedEntries) {
          const updatedSlide = { ...value, id: newIndex };
          await update(ref(database, `slides_bath/${newIndex}`), updatedSlide);
          newIndex++;
        }
      }
    }
  };

  return (
    <div
      className="admin-container"
      style={{ paddingLeft: "300px", paddingRight: "5%", marginTop: "110px" }}
    >
      <h1>Bath Slides</h1>

      {/* Top Bar */}
      <div
        className="admin-topbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          zIndex: 10,
        }}
      >
        <input
          type="text"
          placeholder="Search ........"
          className="admin-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            height: "45px",
            width: "320px",
            border: "1px solid #D63384",
            borderRadius: "10px",
            padding: "0 15px",
            fontSize: "16px",
            background: "#e3e1e1",
            zIndex: 10,
            maxWidth: "280px",
          }}
        />

        <button
          className="admin-add-button"
          onClick={handleAddClick}
          style={{
            background: "#D63384",
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

      {/* Image Upload Form */}
      {showForm && (
        <SlideManager
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingSlide(null);
          }}
          initialData={editingSlide}
          newId={newSlideId}
          folder="bath"
        />
      )}

      {/* Slide List */}
      <div>
        {slides
          .filter((item) =>
            item.link?.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .sort((a, b) => b.id - a.id)
          .map((item) => (
            <div
              key={item.id}
              className="slide-card"
              style={{
                minHeight: "100px",
                width: "100%",
                borderRadius: "10px",
                background: "#D63384",
                marginTop: "50px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div
                className="slide-info"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "20px",
                  gap: "20px",
                }}
              >
                <img
                  src={item.img}
                  alt="slide"
                  style={{
                    height: "80px",
                    width: "120px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <p style={{ color: "white", wordBreak: "break-all" }}>
                  {item.heading}
                </p>
              </div>

              <div
                className="slide-actions"
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
                    setEditingSlide(item);
                    setShowForm(true);
                  }}
                  style={{
                    background: "white",
                    color: "#D63384",
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
                    color: "#D63384",
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

      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .admin-topbar {
              flex-direction: column;
              gap: 15px;
              align-items: flex-start !important;
            }
            .admin-search-input {
              width: 100% !important;
              max-width: 280px !important;
              margin-bottom: 10px !important;
            }
            .admin-add-button {
              width: 100% !important;
              justify-content: center;
            }
            .slide-card {
              flex-direction: column;
              height: auto !important;
            }
            .slide-info {
              flex-direction: column;
              align-items: flex-start !important;
              gap: 10px;
            }
            .slide-actions {
              padding-right: 0 !important;
              justify-content: flex-start;
              gap: 10px !important;
              flex-wrap: wrap;
            }
            .slide-actions button {
              width: 48% !important;
            }
            img.slide-img {
              width: 80px !important;
              height: 80px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AdminSlideBath;
