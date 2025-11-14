import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression"; // 👈 Import this!

const ProductForm = ({
  onSubmit,
  onCancel,
  initialData,
  newId,
  folder = "products",
}) => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [img, setImg] = useState(initialData?.img || "");
  const [previewImage, setPreviewImage] = useState(initialData?.img || "");
  const [uploading, setUploading] = useState(false);
  const displayId = initialData?.id ?? newId;

  // ✅ Pre-fill form when editing
  useEffect(() => {
    if (initialData) {
      setHeading(initialData.Heading || "");
      setSubHeading(initialData.subHeading || "");
      setDescription(initialData.description || "");
      setLink(initialData.link || "");
      setImg(initialData.img || "");
      setPreviewImage(initialData.img || "");
    }
  }, [initialData]);

  // 🌩️ Cloudinary Config
  const CLOUD_NAME = "dthgvzk7v";
  const UPLOAD_PRESET = "glowthic";

  // 📤 Upload image to Cloudinary and keep real file name
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewImage(URL.createObjectURL(file));

    try {
      setUploading(true);

      // 🧠 Compress before upload
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", folder);
      formData.append("public_id", file.name.split(".")[0]);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      console.log("Cloudinary Response:", data);

      if (data.secure_url) {
        setImg(data.secure_url);
        setPreviewImage(data.secure_url);
        console.log("✅ Uploaded:", data.secure_url);
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Image upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Submit form data (with Cloudinary URL)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!heading || !subHeading || !description || !link || !img) {
      alert("Please fill out all fields.");
      return;
    }

    const newProduct = {
      id: displayId,
      Heading: heading,
      subHeading,
      description,
      link,
      img, // Cloudinary image URL
      imageName: img.split("/").pop(), // Store filename
    };

    onSubmit(newProduct);

    // Reset form
    setHeading("");
    setSubHeading("");
    setDescription("");
    setLink("");
    setImg("");
    setPreviewImage("");
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          color: "#7d0a0a",
          fontSize: "40px",
          marginTop: "-10px",
        }}
      >
        {initialData ? "Edit Product" : "Add Product"}
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          padding: "25px",
          width: "75%",
          background: "#D4AF37",
          border: "1px solid #7d0a0a",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          margin: "0 auto",
          marginTop: "-20px",
        }}
      >
        {/* Product ID */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <label style={{ fontSize: "30px", color: "#7d0a0a", width: "200px" }}>
            Product ID
          </label>
          <input
            type="number"
            value={displayId ?? ""}
            disabled
            style={{
              flex: 1,
              height: "50px",
              border: "none",
              borderRadius: "10px",
              textAlign: "center",
              fontSize: "18px",
              backgroundColor: "#f0f0f0",
            }}
          />
        </div>

        {/* Heading */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <label style={{ fontSize: "30px", color: "#7d0a0a", width: "200px" }}>
            Heading
          </label>
          <input
            type="text"
            placeholder="Enter Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            style={{
              flex: 1,
              height: "50px",
              border: "none",
              borderRadius: "10px",
              textAlign: "center",
              fontSize: "18px",
            }}
          />
        </div>

        {/* Subheading */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <label style={{ fontSize: "30px", color: "#7d0a0a", width: "200px" }}>
            Sub Heading
          </label>
          <input
            type="text"
            placeholder="Enter Sub Heading"
            value={subHeading}
            onChange={(e) => setSubHeading(e.target.value)}
            style={{
              flex: 1,
              height: "50px",
              border: "none",
              borderRadius: "10px",
              textAlign: "center",
              fontSize: "18px",
            }}
          />
        </div>

        {/* Description */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <label style={{ fontSize: "30px", color: "#7d0a0a", width: "200px" }}>
            Product Description
          </label>
          <input
            type="text"
            placeholder="Enter Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              flex: 1,
              height: "50px",
              border: "none",
              borderRadius: "10px",
              textAlign: "center",
              fontSize: "18px",
            }}
          />
        </div>

        {/* Product Link */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <label style={{ fontSize: "30px", color: "#7d0a0a", width: "200px" }}>
            Product Link
          </label>
          <input
            type="url"
            placeholder="Enter product link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            style={{
              flex: 1,
              height: "50px",
              border: "none",
              borderRadius: "10px",
              textAlign: "center",
              fontSize: "18px",
            }}
          />
        </div>

        {/* Image Upload */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <label style={{ fontSize: "30px", color: "#7d0a0a", width: "200px" }}>
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ flex: 1, fontSize: "16px" }}
          />
        </div>

        {uploading && (
          <p style={{ textAlign: "center", color: "gray" }}>
            Uploading image...
          </p>
        )}

        {/* Image Preview */}
        {previewImage && (
          <div style={{ textAlign: "center" }}>
            <img
              src={previewImage}
              alt="Preview"
              style={{ height: "100px", borderRadius: "10px" }}
            />
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <button
            type="submit"
            disabled={uploading}
            style={{
              padding: "15px 40px",
              fontSize: "20px",
              backgroundColor: "#7d0a0a",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            {uploading ? "Uploading..." : initialData ? "Update" : "Save"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "15px 40px",
              fontSize: "20px",
              backgroundColor: "#7d0a0a",
              color: "white",
              border: "none",
              borderRadius: "10px",
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

export default ProductForm;
