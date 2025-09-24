import React from "react";
import { Route, Routes } from "react-router-dom";

// Layout
import Sidebar from "./Sidebar";
import ProtectedRoute from "./ProtectedRoute";

// Pages
import Dashboard from "./Dashboard";
import Adminface from "./AdminSubPage/Adminface";
import Admineye from "./AdminSubPage/Admineye";
import Adminlip from "./AdminSubPage/Adminlip";
import Adminnails from "./AdminSubPage/Adminnails";
import Adminmoistrizer from "./AdminSubPage/Adminmoistrizer";
import Admincleanser from "./AdminSubPage/Admincleanser";
import Adminserum from "./AdminSubPage/Adminserum";
import Adminsunscreen from "./AdminSubPage/Adminsunscreen";
import Adminfacemask from "./AdminSubPage/Adminfacemask";
import Adminbodylotion from "./AdminSubPage/Adminbodylotion";
import Adminscrub from "./AdminSubPage/Adminscrub";
import Adminshampoo from "./AdminSubPage/Adminshampoo";
import Adminconditioner from "./AdminSubPage/Adminconditioner";
import Adminhairoil from "./AdminSubPage/Adminhair-oil";
import Adminhairserum from "./AdminSubPage/Adminhair-serum";
import Adminhairmask from "./AdminSubPage/Adminhair-mask";
import Adminhaircolor from "./AdminSubPage/Adminhair-color";
import Adminhairgel from "./AdminSubPage/Adminhair-gel";
import AdminWomenperfume from "./AdminSubPage/AdminWomenperfume";
import AdminMenperfume from "./AdminSubPage/AdminMenperfume";
import Adminunixerperfume from "./AdminSubPage/Adminunixerperfume";
import AdminDeodrant from "./AdminSubPage/AdminDeodrant";
import AdminBodymist from "./AdminSubPage/AdminBodymist";
import AdminSoap from "./AdminSubPage/AdminSoap";
import AdminBodywash from "./AdminSubPage/AdminBodywash";
import AdminShavingCream from "./AdminSubPage/AdminShavingCream";
import AdminWaxing from "./AdminSubPage/AdminWaxing";
import AdminOilSkin from "./AdminSubPage/AdminOilSkin";
import AdminDrySkin from "./AdminSubPage/AdminDrySkin";
import AdminNormalSkin from "./AdminSubPage/AdminNormalSkin";
import AdminCombinationSkin from "./AdminSubPage/AdminCombinationSkin";
import AdminWomen from "./AdminSubPage/AdminWomen";
import AdminMen from "./AdminSubPage/AdminMen";


const AdminLayout = () => {
  return (
    <div>
      
      <Routes>
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-face"
          element={
            <ProtectedRoute>
              <Adminface />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-eye"
          element={
            <ProtectedRoute>
              <Admineye />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-lip"
          element={
            <ProtectedRoute>
              <Adminlip />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-nails"
          element={
            <ProtectedRoute>
              <Adminnails />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-moisturizer"
          element={
            <ProtectedRoute>
              <Adminmoistrizer />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-cleanser"
          element={
            <ProtectedRoute>
              <Admincleanser />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-serum"
          element={
            <ProtectedRoute>
              <Adminserum />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-sunscreen"
          element={
            <ProtectedRoute>
              <Adminsunscreen />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-facemask"
          element={
            <ProtectedRoute>
              <Adminfacemask />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-bodylotion"
          element={
            <ProtectedRoute>
              <Adminbodylotion />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-scrub"
          element={
            <ProtectedRoute>
              <Adminscrub />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-shampoo"
          element={
            <ProtectedRoute>
              <Adminshampoo />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-conditioner"
          element={
            <ProtectedRoute>
              <Adminconditioner />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-hair-oil"
          element={
            <ProtectedRoute>
              <Adminhairoil />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-hair-serum"
          element={
            <ProtectedRoute>
              <Adminhairserum />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-hair-mask"
          element={
            <ProtectedRoute>
              <Adminhairmask />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-hair-color"
          element={
            <ProtectedRoute>
              <Adminhaircolor />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-hair-gel"
          element={
            <ProtectedRoute>
              <Adminhairgel />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-women-perfume"
          element={
            <ProtectedRoute>
              <AdminWomenperfume />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-men-perfume"
          element={
            <ProtectedRoute>
              <AdminMenperfume />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-unisexperfume"
          element={
            <ProtectedRoute>
              <Adminunixerperfume />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-deodrant"
          element={
            <ProtectedRoute>
              <AdminDeodrant />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-body-mist"
          element={
            <ProtectedRoute>
              <AdminBodymist />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-soaps"
          element={
            <ProtectedRoute>
              <AdminSoap />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-body-wash"
          element={
            <ProtectedRoute>
              <AdminBodywash />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-shaving-creams"
          element={
            <ProtectedRoute>
              <AdminShavingCream />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-waxing"
          element={
            <ProtectedRoute>
              <AdminWaxing />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-Oil-Skin"
          element={
            <ProtectedRoute>
              <AdminOilSkin />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-Dry-Skin"
          element={
            <ProtectedRoute>
              <AdminDrySkin />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-Normal-Skin"
          element={
            <ProtectedRoute>
              <AdminNormalSkin />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-Combination-Skin"
          element={
            <ProtectedRoute>
              <AdminCombinationSkin />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-Women"
          element={
            <ProtectedRoute>
              <AdminWomen />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-Men"
          element={
            <ProtectedRoute>
              <AdminMen />
              <Sidebar/>
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </div>
  );
};

export default AdminLayout;
