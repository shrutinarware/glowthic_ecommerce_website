import React, { useState,useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductForm from "../AdminSubPage/ProductForm"; 

const Adminhairoil = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [idCounter, setIdCounter] = useState(1); 
  const [newProductId, setNewProductId] = useState(null); 

  // Handle add or edit submit
  const handleFormSubmit = (product) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      const newProduct = { ...product, id: idCounter };
      setProducts([newProduct, ...products]);
      setIdCounter((prev) => prev + 1); 
    }

    setShowForm(false);
    setEditingProduct(null);
    setNewProductId(null);
  };

  // Load products from localStorage when the component mounts
  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("products_hairoil")) || [];
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
      localStorage.setItem("products_hairoil", JSON.stringify(products));
    }
  }, [products]);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div style={{ paddingLeft: "14%", paddingRight: "5%", }}>
      <h1>Hair Oil</h1>

      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search product..."
          style={{
            height: "45px",
            width: "320px",
            border: "1px solid #D63384",
            borderRadius: "10px",
            padding: "0 15px",
            fontSize: "16px",
            background: "#e3e1e1",
          }}
        />

        <button
          onClick={() => {
            setShowForm(true);
            setEditingProduct(null);
            setNewProductId(idCounter);
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

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
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
              <div
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
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

              <div
                style={{ display: "flex", gap: "20px", alignItems: "center" ,paddingRight: "40px",}}
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
    </div>
  );
};

export default Adminhairoil;
