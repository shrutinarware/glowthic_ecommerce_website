import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductForm from "../AdminSubPage/ProductForm"; // ✅ Make sure this path is correct

const Adminunisexperfume = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [idCounter, setIdCounter] = useState(1); // 👈 Track current ID
  const [newProductId, setNewProductId] = useState(null); // 👈 Store ID for new form

  // Handle form submission
  const handleFormSubmit = (product) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      const newProduct = { ...product, id: newProductId };
      setProducts([newProduct, ...products]);
    }

    setShowForm(false);
    setEditingProduct(null);
    setNewProductId(null);
  };

  // Load products from localStorage
  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("products_bodylotion")) || [];
    setProducts(storedProducts);

    const lastProductId =
      storedProducts.length > 0
        ? storedProducts[storedProducts.length - 1].id
        : 0;
    setIdCounter(lastProductId + 1);
  }, []);

  // Save products to localStorage on change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products_bodylotion", JSON.stringify(products));
    }
  }, [products]);

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => {
        const updatedProducts = prev.filter((p) => p.id !== id);

        // Update the idCounter to the next highest ID
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
    <div
      className="admin-container"
      style={{ paddingLeft: "250px", paddingRight: "5%" }}
    >
      <h1>Unisex Perfume</h1>

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
            zIndex: 10, // Ensures input stays on top
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
            zIndex: 10,
          }}
        >
          <AddIcon style={{ fontSize: 24 }} />
          Add
        </button>
      </div>

      {/* Product Form */}
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

      {/* Product List */}
      <div>
        {products.map((item) => (
          <div
            key={item.id}
            className="product-card"
            style={{
              minHeight: "150px",
              width: "100%",
              borderRadius: "10px",
              background: "#D63384",
              marginTop: "50px",
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
                src={item.img}
                alt="product"
                className="product-img"
                style={{
                  height: "100px",
                  width: "100px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
              <div
                className="product-title"
                style={{ lineHeight: "1.2", color: "white" }}
              >
                <h1 style={{ margin: 0 }}>{item.Heading}</h1>
                <h3 style={{ margin: 0 }}>{item.subHeading}</h3>
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
            .admin-container {
              padding-left: 250px
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

export default Adminunisexperfume;
