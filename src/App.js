import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Layout
import Topbar from "./Components/User/Topbar";
import Footer from "./Components/User/Footer";

// Routes
import UserRoutes from "./Components/User/UserRoutes";
import AdminLayout from "./Components/Admin/AdminLayout";
import LoginPage from "./Components/Admin/LoginPage";


// 🔹 ScrollToTop component (must be above App)
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll instantly to top whenever route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


// 🔹 Layout wrapper
const Layout = () => {
  const location = useLocation();
  const hideTopbarRoutes = ["/adminlogin"];
  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/adminlogin" ||
    location.pathname === "/user-activityinfo" ||
    location.pathname === "/user-response" ||
    location.pathname === "/user-logindata" ||
    location.pathname === "/Dashboard";

  // 🔹 Automatically update tab title
  useEffect(() => {
    let path = location.pathname.replace("/", "");

    if (path === "" || path === "/") {
      document.title = "Glowthic | Home";
      return;
    }

    const formatted = path
      .split("/")
      .filter(Boolean)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" / ");

    document.title = `Glowthic | ${formatted}`;
  }, [location]);

  return (
    <>
      {!hideTopbarRoutes.includes(location.pathname) && <Topbar />}
      <Routes>
        <Route path="/adminlogin" element={<LoginPage />} />
      </Routes>
      <UserRoutes />
      <AdminLayout />
      {!isAdminRoute && <Footer />}
    </>
  );
};


// 🔹 Main App
const App = () => {
  return (
    <Router>
      <ScrollToTop />  {/* ✅ Now works perfectly */}
      <Layout />
    </Router>
  );
};

export default App;
