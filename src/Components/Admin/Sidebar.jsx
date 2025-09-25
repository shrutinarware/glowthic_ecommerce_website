import * as React from "react";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

//Icons
import Bath from "../../assets/sidebar/BathIcon.jpg";
import Makeup from "../../assets/sidebar/MakeupIcon.jpg";
import Skin from "../../assets/sidebar/SkinIcon.jpg";
import Fragnance from "../../assets/sidebar/FragnanceIcon.jpg";
import Hair from "../../assets/sidebar/HairIcon.jpg";
import Tools from "../../assets/sidebar/tools_15030294.jpg";
import Oily from "../../assets/sidebar/OilyIcon.jpg";
import Dry from "../../assets/sidebar/DryIcon.jpg";
import Normal from "../../assets/sidebar/NormalIcon.jpg";
import Combination from "../../assets/sidebar/CombinationIcon.jpg";
import Women from "../../assets/sidebar/WomenIcon.jpg";
import Men from "../../assets/sidebar/MenIcon.jpg";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [setIsClosing] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;
  //Makeup
  const [openMakeup, setOpenMakeup] = React.useState(false);

  const handleMakeupClick = () => {
    setOpenMakeup(!openMakeup);
  };
  //Skin
  const [openSkin, setOpenSkin] = React.useState(false);
  const handleSkinClick = () => {
    setOpenSkin(!openSkin);
  };
  //Hair
  const [openHair, setOpenHair] = React.useState(false);
  const handleHairClick = () => {
    setOpenHair(!openHair);
  };
  //Fragnance
  const [openFragnance, setOpenFragnance] = React.useState(false);
  const handleFragnanceClick = () => {
    setOpenFragnance(!openFragnance);
  };
  //Bath & Hyginie
  const [openHyginie, setOpenHyginie] = React.useState(false);
  const handleHyginieClick = () => {
    setOpenHyginie(!openHyginie);
  };
  //Tools
  const [openTools, setOpenTools] = React.useState(false);
  const handleToolsClick = () => {
    setOpenTools(!openTools);
  };
  //log out
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      sessionStorage.clear();
      clearProductLocalStorage();

      navigate("/adminlogin");
    }
  };
  function clearProductLocalStorage() {
    const keysToRemove = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("products_")) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
  }

  const drawer = (
    <div
      style={{
        background: "pink",
        height: "",
        marginTop: "-60px",
      }}
    >
      <Toolbar />

      {/* --- Makeup, Skin, Hair, etc. --- */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleMakeupClick}>
            <img
              src={Makeup}
              alt="Makeup"
              style={{ height: "35px", width: "35px", marginRight: "20px" }}
            />
            <ListItemText primary="Makeup" />
            {openMakeup ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openMakeup} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-face`)}
            >
              <ListItemText primary="Face" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-lip`)}
            >
              <ListItemText primary="Lip" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-eye`)}
            >
              <ListItemText primary="Eye" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-nails`)}
            >
              <ListItemText primary="Nails" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={handleSkinClick}>
            <img
              src={Skin}
              alt="skin"
              style={{ height: "35px", width: "35px", marginRight: "20px" }}
            />
            <ListItemText primary="Skin" />
            {openSkin ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openSkin} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-moisturizer`)}
            >
              <ListItemText primary="Moisturizers" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-cleanser`)}
            >
              <ListItemText primary="Cleansers" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-serum`)}
            >
              <ListItemText primary="Serums" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8 }}
              onClick={() => navigate(`/admin-sunscreen`)}
            >
              <ListItemText primary="Sunscreens" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-facemask`)}
            >
              <ListItemText primary="Face Masks" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-bodylotion`)}
            >
              <ListItemText primary="Bodylotions" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-scrub`)}
            >
              <ListItemText primary="Scrubs" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={handleHairClick}>
            <img
              src={Hair}
              alt="hair"
              style={{ height: "35px", width: "35px", marginRight: "20px" }}
            />
            <ListItemText primary="Hair" />
            {openHair ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openHair} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-shampoo`)}
            >
              <ListItemText primary="Shampoos" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-conditioner`)}
            >
              <ListItemText primary="Conditioners" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-hair-oil`)}
            >
              <ListItemText primary="Hair Oils" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-hair-serum`)}
            >
              <ListItemText primary="Hair Serums" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-hair-mask`)}
            >
              <ListItemText primary="Hair Masks" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-hair-color`)}
            >
              <ListItemText primary="Hair Colors" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-hair-gel`)}
            >
              <ListItemText primary="Hair Gels" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={handleFragnanceClick}>
            <img
              src={Fragnance}
              alt="fragnance"
              style={{ height: "35px", width: "35px", marginRight: "20px" }}
            />
            <ListItemText primary="Fragnance" />
            {openFragnance ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openFragnance} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-men-perfume`)}
            >
              <ListItemText primary="Men's Perfumes" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-women-perfume`)}
            >
              <ListItemText primary="Women's Perfumes" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-unisexperfume`)}
            >
              <ListItemText primary="Unisex Perfumes" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-deodrant`)}
            >
              <ListItemText primary="Deodrants" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-body-mist`)}
            >
              <ListItemText primary="Body Mists" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={handleHyginieClick}>
            <img
              src={Bath}
              alt="bath"
              style={{ height: "35px", width: "35px", marginRight: "20px" }}
            />
            <ListItemText primary="Bath & Hyginie" />
            {openHyginie ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openHyginie} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-soaps`)}
            >
              <ListItemText primary="Soaps" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-body-wash`)}
            >
              <ListItemText primary="Body Wash" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-shaving-creams`)}
            >
              <ListItemText primary="Shaving creams" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 8, marginLeft: "15px" }}
              onClick={() => navigate(`/admin-waxing`)}
            >
              <ListItemText primary="Waxing Needs" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={handleToolsClick}>
            <img
              src={Tools}
              alt="tools"
              style={{ height: "35px", width: "35px", marginRight: "20px" }}
            />
            <ListItemText primary="Appliances & Tools" />
            {openTools ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
      </List>
      <Collapse in={openTools} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 8, marginLeft: "15px" }}
            onClick={() => navigate(`/admin-dryer`)}
          >
            <ListItemText primary="Hair Dryers" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 8, marginLeft: "15px" }}
            onClick={() => navigate(`/admin-straightner`)}
          >
            <ListItemText primary="Hair Straightner" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 8, marginLeft: "15px" }}
            onClick={() => navigate(`/admin-curler`)}
          >
            <ListItemText primary="Hair Culers" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 8, marginLeft: "15px" }}
            onClick={() => navigate(`/admin-trimmer`)}
          >
            <ListItemText primary="Timmers" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 8, marginLeft: "15px" }}
            onClick={() => navigate(`/admin-steamer`)}
          >
            <ListItemText primary="Facial Steamers" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 8, marginLeft: "15px" }}
            onClick={() => navigate(`/admin-epillator`)}
          >
            <ListItemText primary="Epillators" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 8, marginLeft: "15px" }}
            onClick={() => navigate(`/admin-massagetools`)}
          >
            <ListItemText primary="Massage Tools" />
          </ListItemButton>
        </List>
      </Collapse>

      <Divider
        sx={{
          background: "white",
          height: "2px",
          width: "80%",
          marginLeft: "10%",
        }}
      />

      {/* --- Skin Types --- */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(`/admin-Oil-Skin`)}>
            <img
              src={Oily}
              alt="oily"
              style={{ height: "35px", width: "35px", marginRight: "20px" }}
            />
            <ListItemText primary="Oily Skin" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(`/admin-Dry-Skin`)}>
            <img
              src={Dry}
              alt="dry"
              style={{ height: "40px", width: "40px", marginRight: "20px" }}
            />
            <ListItemText primary="Dry Skin" style={{ paddingTop: "20px" }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(`/admin-Combination-Skin`)}>
            <img
              src={Combination}
              alt="combination"
              style={{ height: "35px", width: "35px", marginRight: "20px" }}
            />
            <ListItemText
              primary="Combination Skin"
              style={{ paddingTop: "20px" }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(`/admin-Normal-Skin`)}>
            <img
              src={Normal}
              alt="normal"
              style={{ height: "35px", width: "35px", marginRight: "20px" }}
            />
            <ListItemText
              primary="Normal Skin"
              style={{ paddingTop: "20px" }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider
        sx={{
          background: "white",
          height: "2px",
          width: "80%",
          marginLeft: "10%",
        }}
      />

      {/* --- Gender --- */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(`/admin-Women`)}>
            <img
              src={Women}
              alt="women"
              style={{ height: "40px", width: "40px", marginRight: "20px" }}
            />
            <ListItemText primary="Women" style={{ paddingTop: "20px" }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(`/admin-Men`)}>
            <img
              src={Men}
              alt="men"
              style={{ height: "40px", width: "40px", marginRight: "20px" }}
            />
            <ListItemText primary="Men" style={{ paddingTop: "20px" }} />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider
        sx={{
          background: "white",
          height: "2px",
          width: "80%",
          marginLeft: "10%",
        }}
      />

      {/* --- Dashboard --- */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar navigation */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              top: "150px", // ✅ Start below Topbar
              height: "calc(100% - 150px)",
              zIndex: 999, // ✅ Still below Topbar (1000)
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              top: "150px",
              height: "calc(100% - 150px)",
              position: "fixed",
              zIndex: 500,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          paddingTop: "250px",
        }}
      >
        {/* <Toolbar /> */}
      </Box>
    </Box>
  );
}
