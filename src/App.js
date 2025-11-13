import React, { useEffect, useState } from "react";
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
import UserLoginModal from "./Components/User/UserLoginModal";


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
  // ✅ Global Login Modal State
  const [showLoginModal, setShowLoginModal] = useState(false);

  // ✅ Listen for login open event
  useEffect(() => {
    const openLogin = () => setShowLoginModal(true);

    window.addEventListener("openLoginModal", openLogin);
    return () => window.removeEventListener("openLoginModal", openLogin);
  }, []);


  return (
    <>
      {!hideTopbarRoutes.includes(location.pathname) && <Topbar />}
      <Routes>
        <Route path="/adminlogin" element={<LoginPage />} />
      </Routes>
      <UserRoutes />
      <AdminLayout />
      {!isAdminRoute && <Footer />}

      {/* ✅ Global Login Modal Render */}
      {showLoginModal && (
        <UserLoginModal onClose={() => setShowLoginModal(false)} />
      )}
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
