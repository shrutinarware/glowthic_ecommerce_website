import React, { useState } from "react";
import imageCompression from "browser-image-compression";

const BrandManager = ({ onSubmit, onCancel, initialData, newId }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [link, setLink] = useState(initialData?.link || "");
  const [logo, setLogo] = useState(initialData?.img || "");
  const [previewLogo, setPreviewLogo] = useState(initialData?.img || "");
  const [uploading, setUploading] = useState(false);

  // ⚙️ Your Cloudinary Config
  const CLOUD_NAME = "dthgvzk7v"; // e.g., dqsj7gfrt
  const UPLOAD_PRESET = "glowthic"; // e.g., unsigned_preset

  // ✅ CLOUDINARY UPLOAD HANDLER
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewLogo(URL.createObjectURL(file));

    try {
      setUploading(true);

      // Compress image
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);

      // Prepare Cloudinary upload
      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("upload_preset", UPLOAD_PRESET);
      // ⚠️ Remove this next line if folder not configured in Cloudinary preset
      formData.append("folder", "brands");

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("🪄 Cloudinary Response:", data); // 👈 This line shows exact error

      if (data.secure_url) {
        setLogo(data.secure_url);
        console.log("✅ Upload Success:", data.secure_url);
      } else {
        throw new Error(data.error?.message || "Cloudinary upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert(`Image upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const brandData = {
      id: initialData?.id || newId,
      name,
      link,
      img: logo, // Cloudinary image URL
    };
    onSubmit(brandData);
  };

  return (
    <div>
      <h2 style={{ color: "#D63384", textAlign: "center", fontSize: "30px" }}>
        {initialData ? "Edit Brand" : "Add New Brand"}
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          padding: "20px",
          background: "pink",
          border: "none",
          borderRadius: "15px",
          width: "80%",
          margin: "20px auto",
        }}
      >
        {/* Brand Name */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label
            style={{ fontWeight: "bold", color: "#D63384", fontSize: "25px" }}
          >
            Brand Name
          </label>
          <input
            type="text"
            placeholder="Enter brand name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "80%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Brand Link */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label
            style={{ fontWeight: "bold", color: "#D63384", fontSize: "25px" }}
          >
            Brand Link
          </label>
          <input
            type="text"
            placeholder="Enter brand website or link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            style={{
              width: "80%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Brand Logo */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label
            style={{ fontWeight: "bold", color: "#D63384", fontSize: "25px" }}
          >
            Brand Logo
          </label>

          <input type="file" accept="image/*" onChange={handleFileChange} />

          {uploading && (
            <p style={{ color: "gray", textAlign: "center" }}>
              Uploading to Cloudinary...
            </p>
          )}

          {previewLogo && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={previewLogo}
                alt="Preview"
                style={{
                  height: "100px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  objectFit: "contain",
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
              background: "#D63384",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: uploading ? "not-allowed" : "pointer",
            }}
          >
            {uploading ? "Uploading..." : initialData ? "Update" : "Save"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: "#D63384",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
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

export default BrandManager;
