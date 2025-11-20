import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductForm from "../AdminSubPage/ProductForm";
import { database } from "../../../Firebase";
import { ref, get, set, remove, onValue, update } from "firebase/database";

const Adminnails = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductId, setNewProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products
  useEffect(() => {
    const productsRef = ref(database, "products_nails");
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsArray = Object.entries(data)
          .map(([key, value]) => ({
            id: parseInt(key, 10),
            ...value,
          }))
          .sort((a, b) => a.id - b.id);
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle Add Button
  const handleAddClick = async () => {
    const productsRef = ref(database, "products_nails");
    const snapshot = await get(productsRef);
    let nextId = 1;
    if (snapshot.exists()) {
      const productsData = snapshot.val();
      const existingIds = Object.keys(productsData).map((id) =>
        parseInt(id, 10)
      );
      nextId = existingIds.length ? Math.max(...existingIds) + 1 : 1;
    }
    setNewProductId(nextId);
    setShowForm(true);
    setEditingProduct(null);
  };

  // Handle Add / Edit
  const handleFormSubmit = async (product) => {
    if (editingProduct) {
      const productRef = ref(database, `products_nails/${product.id}`);
      await set(productRef, product);
    } else {
      const productRef = ref(database, `products_nails/${newProductId}`);
      await set(productRef, { ...product, id: newProductId });
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  // Handle Delete + Reindex IDs
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const productRef = ref(database, `products_nails/${id}`);
      await remove(productRef);

      // Reindex remaining products
      const productsRef = ref(database, "products_nails");
      const snapshot = await get(productsRef);
      if (snapshot.exists()) {
        const productsData = snapshot.val();
        const sortedEntries = Object.entries(productsData).sort(
          ([a], [b]) => parseInt(a) - parseInt(b)
        );

        // Clear old data
        await set(productsRef, null);

        // Reinsert with new IDs (1, 2, 3...)
        let newIndex = 1;
        for (const [, value] of sortedEntries) {
          const updatedProduct = { ...value, id: newIndex };
          await update(
            ref(database, `products_nails/${newIndex}`),
            updatedProduct
          );
          newIndex++;
        }
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
      <h1>NAIL</h1>

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
            maxWidth: "280px",
          }}
        />

        <button
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
        <ProductForm
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          initialData={editingProduct}
          newId={newProductId}
          folder="Makeup/nails"
        />
      )}

      {/* Product List */}
      <div>
        {products
          .filter((item) =>
            item.Heading.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .sort((a, b) => b.id - a.id)
          .map((item) => (
            <div
              key={item.id}
              className="product-card"
              style={{
                minHeight: "100px",
                width: "100%",
                borderRadius: "10px",
                background: "#7d0a0a",
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
    </div>
  );
};

export default Adminnails;
