import React, { useState, useEffect } from "react";
import { database } from "../../../Firebase";
import { ref, onValue, set } from "firebase/database";

const AdminHomepageSettings = () => {
  const [activeTab, setActiveTab] = useState("settings");

  const [sections, setSections] = useState({
    topCategories: true,
    trending: true,
    blogs: true,
    skinType: true,
    genderSection: true,
    makeupdeals: true,
    skindeals: true,
    hairdeals: true,
    fragnancedeals: true,
    bathdeals: true,
    appliancesdeals: true,
  });

  // ✅ LOAD SETTINGS
  useEffect(() => {
    const settingsRef = ref(database, "homepageSettings/sections");
    onValue(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        setSections(snapshot.val());
      }
    });
  }, []);

  // ✅ SAVE SETTINGS
  const saveSettings = () => {
    set(ref(database, "homepageSettings/sections"), sections)
      .then(() => alert("Homepage Settings Saved!"))
      .catch((err) => console.log(err));
  };

  const toggleSection = (key) => {
    setSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div
      style={{ paddingLeft: "300px", paddingRight: "5%", marginTop: "110px" }}
    >
      {/* ✅ ONLY SETTINGS TAB SHOWN */}
      {activeTab === "settings" && (
        <div style={{ marginTop: "60px" }}>
          <h1>Homepage Sections Control</h1>

          <div
            style={{
              marginTop: "30px",
            }}
          >
            {Object.keys(sections).map((key) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "300px",
                  marginBottom: "10px",
                  color: "#D63384",
                  fontSize: "20px",
                }}
              >
                <span>{key}</span>
                <input
                  type="checkbox"
                  checked={sections[key]}
                  onChange={() => toggleSection(key)}
                />
              </div>
            ))}
          </div>

          <button
            onClick={saveSettings}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "#D63384",
              color: "white",
              border: "none",
              borderRadius: "10px",
            }}
          >
            Save Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminHomepageSettings;
