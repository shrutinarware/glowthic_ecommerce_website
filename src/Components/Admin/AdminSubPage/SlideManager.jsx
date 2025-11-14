import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { database } from "../../../Firebase";
import { ref, set } from "firebase/database";

const SlideManager = ({ onCancel, initialData, newId, folder }) => {
  const [link, setLink] = useState(initialData?.link || "");
  const [heading, setHeading] = useState(initialData?.heading || "");
  const [slideImage, setSlideImage] = useState(initialData?.img || "");
  const [previewImage, setPreviewImage] = useState(initialData?.img || "");
  const [uploading, setUploading] = useState(false);

  // ✅ Cloudinary Config
  const CLOUD_NAME = "dthgvzk7v";
  const UPLOAD_PRESET = "glowthic";

  // ✅ Cloudinary Upload Function
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    try {
      setUploading(true);

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("upload_preset", UPLOAD_PRESET);
      // 👇 Dynamic folder (like slides/makeup, slides/hair)
      formData.append("folder", `slides/${folder}`);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      console.log("Cloudinary Response:", data);

      if (data.secure_url) {
        setSlideImage(data.secure_url);
        setPreviewImage(data.secure_url);
        console.log("✅ Uploaded to Cloudinary:", data.secure_url);
      } else {
        throw new Error(data.error?.message || "Cloudinary upload failed");
      }
    } catch (error) {
      console.error("❌ Upload Error:", error);
      alert(`Image upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Save Slide Data to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!slideImage) {
      alert("Please upload an image first!");
      return;
    }

    const slideData = {
      id: initialData?.id || newId,
      link,
      img: slideImage,
      heading,
    };

    try {
      const path = `slides_${folder}`;
      const slideRef = ref(database, `${path}/${slideData.id}`);
      await set(slideRef, slideData);

      onCancel();
    } catch (error) {
      console.error("❌ Firebase Save Error:", error);
    }
  };

  return (
    <div>
      <h2 style={{ color: "#7d0a0a", textAlign: "center", fontSize: "35px" }}>
        {initialData ? "Edit Slide" : "Add New Slide"}
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "25px",
          width: "80%",
          background: "#D4AF37",
          borderRadius: "20px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label
            style={{ fontSize: "25px", color: "#7d0a0a", fontWeight: "bold" }}
          >
            {" "}
            Heading{" "}
          </label>
          <input
            type="text"
            placeholder="Enter Slide Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            style={{
              width: "75%",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        {/* Redirect Link */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label
            style={{ fontSize: "25px", color: "#7d0a0a", fontWeight: "bold" }}
          >
            Image Link
          </label>
          <input
            type="url"
            placeholder="Enter link for this slide"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            style={{
              width: "75%",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Image Upload */}
        <div
          style={{
            display: "flex",

            gap: "60px",
          }}
        >
          <label
            style={{ fontSize: "25px", color: "#7d0a0a", fontWeight: "bold" }}
          >
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: "10px" }}
          />

          {uploading && (
            <p style={{ color: "gray", textAlign: "center" }}>
              Uploading to Cloudinary...
            </p>
          )}

          {previewImage && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  height: "120px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
        </div>

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
            type="submit"
            disabled={uploading}
            style={{
              background: "#7d0a0a",
              color: "white",
              border: "none",
              padding: "10px 30px",
              borderRadius: "10px",
              fontSize: "18px",
              cursor: uploading ? "not-allowed" : "pointer",
            }}
          >
            {uploading ? "Uploading..." : initialData ? "Update" : "Save"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: "#7d0a0a",
              color: "white",
              border: "none",
              padding: "10px 30px",
              borderRadius: "10px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SlideManager;
