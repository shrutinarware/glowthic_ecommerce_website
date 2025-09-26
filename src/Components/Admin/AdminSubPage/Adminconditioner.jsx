import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductForm from "../AdminSubPage/ProductForm"; // Ensure path is correct

const AdminConditioner = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [idCounter, setIdCounter] = useState(1); // Track current ID
  const [newProductId, setNewProductId] = useState(null); // Store ID for new form

  // Handle add or edit submit
  const handleFormSubmit = (product) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      const newProduct = { ...product, id: idCounter };
      setProducts([newProduct, ...products]);
      setIdCounter((prev) => prev + 1); // Increment for next use
    }

    setShowForm(false);
    setEditingProduct(null);
    setNewProductId(null);
  };

  // Load products from localStorage when component mounts
  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("products_conditioner")) || [];
    setProducts(storedProducts);

    // Set idCounter from the last product ID or 0 if no products
    const lastProductId =
      storedProducts.length > 0
        ? storedProducts[storedProducts.length - 1].id
        : 0;
    setIdCounter(lastProductId + 1);
  }, []);

  // Save products to localStorage whenever the products state changes
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products_conditioner", JSON.stringify(products));
    }
  }, [products]);

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => {
        const updatedProducts = prev.filter((p) => p.id !== id);

        // Update idCounter to the next highest ID
        const highestId = updatedProducts.reduce(
          (max, p) => (p.id > max ? p.id : max),
          0
        );
        setIdCounter(highestId + 1); // Make sure next ID is higher than the current highest ID

        return updatedProducts;
      });
    }
  };

  return (
    <div style={{ paddingLeft: "250px", paddingRight: "5%" }}>
      <h1>Conditioner</h1>

      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search product..."
          className="admin-search-input"
          style={{
            height: "45px",
            width: "320px",
            border: "1px solid #D63384",
            borderRadius: "10px",
            padding: "0 15px",
            fontSize: "16px",
            background: "#e3e1e1",
            maxWidth: "280px",
          }}
        />

        {/* Add Button */}
        <button
          className="admin-add-button"
          onClick={() => {
            setShowForm(true);
            setEditingProduct(null);
            setNewProductId(idCounter);
            setIdCounter((prev) => prev + 1);
          }}
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
          }}
        >
          <AddIcon style={{ fontSize: 24 }} />
          Add
        </button>
      </div>

      {/* Show Product Form */}
      {showForm && (
        <ProductForm
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          initialData={editingProduct}
          newId={newProductId}
        />
      )}

      {/* Product Cards */}
      <div>
        {products.map((item) => (
          <div
            key={item.id}
            style={{
              height: "150px",
              width: "100%",
              borderRadius: "10px",
              background: "#D63384",
              marginTop: "50px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px",
              }}
            >
              {/* Image & Headings */}
              <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <img
                  src={item.img}
                  alt="product"
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "8px",
                  }}
                />
                <div style={{ lineHeight: "1.2", color: "white" }}>
                  <h1 style={{ margin: 0 }}>{item.Heading}</h1>
                  <h3 style={{ margin: 0 }}>{item.subHeading}</h3>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  paddingRight: "40px",
                }}
              >
                <button
                  onClick={() => {
                    setEditingProduct(item);
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
          </div>
        ))}
      </div>

      {/* Responsive styles */}
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
              max-width: 280px !important;
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

export default AdminConditioner;
