import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Layout
import Topbar from "./Components/User/Topbar";
import Footer from "./Components/User/Footer";

// Routes
import UserRoutes from "./Components/User/UserRoutes";
import AdminLayout from "./Components/Admin/AdminLayout";
import LoginPage from "./Components/Admin/LoginPage";

// Layout wrapper
const Layout = () => {
  const location = useLocation();
  const hideTopbarRoutes = ["/adminlogin"];  // Routes where Topbar and Footer should be hidden
  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/adminlogin" ||
    location.pathname === "/Dashboard";         // Detect if current route is an admin route (to hide footer)

  return (
    <>
      {!hideTopbarRoutes.includes(location.pathname) && <Topbar />}

      <Routes>
        {/* Admin login page */}
        <Route path="/adminlogin" element={<LoginPage />} />
      </Routes>
      <UserRoutes/>
      <AdminLayout/>
      {!isAdminRoute && <Footer />}
    </>
  );
};
const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
