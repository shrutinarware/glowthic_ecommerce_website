import React, { useState, useEffect } from "react";

const ProductForm = ({ onSubmit, onCancel, initialData, newId }) => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const displayId = initialData?.id ?? newId;
  const [link, setLink] = useState("");

  // Pre-fill form if editing
  useEffect(() => {
    if (initialData) {
      setHeading(initialData.Heading || "");
      setSubHeading(initialData.subHeading || "");
      setDescription(initialData.description || "");
      setImage(null);
      setPreviewImage(initialData.img || "");
      setLink(initialData.link || "");
    }
  }, [initialData]);

  // Create object URL for previewImage when image file changes
  useEffect(() => {
    if (!image) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result); // Base64 string
    };
    reader.readAsDataURL(image);
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!heading || !subHeading || !previewImage || !description || !link) {
      alert("Please fill out all fields.");
      return;
    }

    const newProduct = {
      id: displayId,
      Heading: heading,
      subHeading,
      description,
      link,
      img: previewImage,
    };

    // Save new product to localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    storedProducts.push(newProduct);
    localStorage.setItem("products", JSON.stringify(storedProducts));

    onSubmit(newProduct);

    // Reset form (optional)
    setHeading("");
    setSubHeading("");
    setDescription("");
    setImage(null);
    setPreviewImage("");
    setLink("");
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          color: "#D63384",
          fontSize: "60px",
          marginTop: "-10px",
        }}
      >
        {initialData ? "Edit Product" : "Add Product"}
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          padding: "30px",
          width: "80%",
          background: "pink",
          border: "1px solid #D63384",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          margin: "0 auto",
        }}
      >
        {/* Product ID */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <label style={{ fontSize: "30px", color: "#D63384", width: "200px" }}>
            Product ID
          </label>
          <input
            type="text"
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
          <label style={{ fontSize: "30px", color: "#D63384", width: "200px" }}>
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
          <label style={{ fontSize: "30px", color: "#D63384", width: "200px" }}>
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
          <label style={{ fontSize: "30px", color: "#D63384", width: "200px" }}>
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
          <label style={{ fontSize: "30px", color: "#D63384", width: "200px" }}>
            Product Link
          </label>
          <input
            type="url" required
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
          <label style={{ fontSize: "30px", color: "#D63384", width: "200px" }}>
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImage(file); // Just set image file here
              }
            }}
            style={{
              flex: 1,
              fontSize: "16px",
            }}
          />
        </div>

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
            style={{
              padding: "15px 40px",
              fontSize: "20px",
              backgroundColor: "#D63384",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            {initialData ? "Update" : "Save"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "15px 40px",
              fontSize: "20px",
              backgroundColor: "#D63384",
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
