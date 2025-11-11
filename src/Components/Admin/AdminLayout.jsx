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
import AdminDryer from "./AdminSubPage/AdminDryer";
import AdminStraightner from "./AdminSubPage/AdminStraightner";
import AdminCurler from "./AdminSubPage/AdminCurler";
import AdminOilySkin from "./AdminSubPage/AdminOilySkin";
import AdminDrySkin from "./AdminSubPage/AdminDrySkin";
import AdminNormalSkin from "./AdminSubPage/AdminNormalSkin";
import AdminCombinationSkin from "./AdminSubPage/AdminCombinationSkin";
import AdminTrimmer from "./AdminSubPage/AdminTrimmer";
import AdminSteamer from "./AdminSubPage/AdminSteamer";
import AdminEpilator from "./AdminSubPage/AdminEpillator";
import AdminMassageTool from "./AdminSubPage/AdminMassageTool";
// User Details
import UserLoginData from "./UserLoginData";
import UserResponse from "./UserResponse";
import UserActivityInfo from "./UserActivityInfo";
import AdminSlideMakeup from "./AdminSubPage/AdminSlideMakeup";
import AdminSlideHair from "./AdminSubPage/AdminSlideHair";
import AdminSlideSkin from "./AdminSubPage/AdminSlideSkin";
import AdminSlideFragnance from "./AdminSubPage/AdminSlideFragnance";
import AdminSlideBath from "./AdminSubPage/AdminSlideBath";
import AdminSlideAppliances from "./AdminSubPage/AdminSlideAppliances";
import AdminBrands from "./AdminSubPage/AdminBrands";
import AdminTrendingProduct from "./AdminSubPage/AdminTrendingProduct";
import AdminHomepageSettings from "./AdminSubPage/AdminHomePageSetting";
import AdminDealsManager from "./AdminSubPage/AdminDealsManager";

const AdminLayout = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-face"
          element={
            <ProtectedRoute>
              <Adminface />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-eye"
          element={
            <ProtectedRoute>
              <Admineye />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-lip"
          element={
            <ProtectedRoute>
              <Adminlip />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-nails"
          element={
            <ProtectedRoute>
              <Adminnails />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-moisturizer"
          element={
            <ProtectedRoute>
              <Adminmoistrizer />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-cleanser"
          element={
            <ProtectedRoute>
              <Admincleanser />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-serum"
          element={
            <ProtectedRoute>
              <Adminserum />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-sunscreen"
          element={
            <ProtectedRoute>
              <Adminsunscreen />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-facemask"
          element={
            <ProtectedRoute>
              <Adminfacemask />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-bodylotion"
          element={
            <ProtectedRoute>
              <Adminbodylotion />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-scrub"
          element={
            <ProtectedRoute>
              <Adminscrub />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-shampoo"
          element={
            <ProtectedRoute>
              <Adminshampoo />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-conditioner"
          element={
            <ProtectedRoute>
              <Adminconditioner />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-hair-oil"
          element={
            <ProtectedRoute>
              <Adminhairoil />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-hair-serum"
          element={
            <ProtectedRoute>
              <Adminhairserum />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-hair-mask"
          element={
            <ProtectedRoute>
              <Adminhairmask />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-hair-color"
          element={
            <ProtectedRoute>
              <Adminhaircolor />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-hair-gel"
          element={
            <ProtectedRoute>
              <Adminhairgel />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-women-perfume"
          element={
            <ProtectedRoute>
              <AdminWomenperfume />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-men-perfume"
          element={
            <ProtectedRoute>
              <AdminMenperfume />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-unisexperfume"
          element={
            <ProtectedRoute>
              <Adminunixerperfume />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-deodrant"
          element={
            <ProtectedRoute>
              <AdminDeodrant />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-body-mist"
          element={
            <ProtectedRoute>
              <AdminBodymist />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-soaps"
          element={
            <ProtectedRoute>
              <AdminSoap />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-body-wash"
          element={
            <ProtectedRoute>
              <AdminBodywash />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-shaving-creams"
          element={
            <ProtectedRoute>
              <AdminShavingCream />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-waxing"
          element={
            <ProtectedRoute>
              <AdminWaxing />
              <Sidebar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dryer"
          element={
            <ProtectedRoute>
              <AdminDryer />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-straightner"
          element={
            <ProtectedRoute>
              <AdminStraightner />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-curler"
          element={
            <ProtectedRoute>
              <AdminCurler />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-trimmer"
          element={
            <ProtectedRoute>
              <AdminTrimmer />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-steamer"
          element={
            <ProtectedRoute>
              <AdminSteamer />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-epillator"
          element={
            <ProtectedRoute>
              <AdminEpilator />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-massagetools"
          element={
            <ProtectedRoute>
              <AdminMassageTool />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-slides-makeup"
          element={
            <ProtectedRoute>
              <AdminSlideMakeup />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-slides-hair"
          element={
            <ProtectedRoute>
              <AdminSlideHair />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-slides-skin"
          element={
            <ProtectedRoute>
              <AdminSlideSkin />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-slides-fragnance"
          element={
            <ProtectedRoute>
              <AdminSlideFragnance />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-slides-bath"
          element={
            <ProtectedRoute>
              <AdminSlideBath />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-slides-appliances"
          element={
            <ProtectedRoute>
              <AdminSlideAppliances />
              <Sidebar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-brands"
          element={
            <ProtectedRoute>
              <AdminBrands />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-Oil-Skin"
          element={
            <ProtectedRoute>
              <AdminOilySkin />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-Dry-Skin"
          element={
            <ProtectedRoute>
              <AdminDrySkin />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-Normal-Skin"
          element={
            <ProtectedRoute>
              <AdminNormalSkin />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-Combination-Skin"
          element={
            <ProtectedRoute>
              <AdminCombinationSkin />
              <Sidebar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-response"
          element={
            <ProtectedRoute>
              <UserResponse />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-logindata"
          element={
            <ProtectedRoute>
              <UserLoginData />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-activityinfo"
          element={
            <ProtectedRoute>
              <UserActivityInfo />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-trending-product"
          element={
            <ProtectedRoute>
              <AdminTrendingProduct />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="//admin-homepage-setting"
          element={
            <ProtectedRoute>
              <AdminHomepageSettings />
              <Sidebar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-deals-manager"
          element={
            <ProtectedRoute>
              <AdminDealsManager />
              <Sidebar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AdminLayout;
