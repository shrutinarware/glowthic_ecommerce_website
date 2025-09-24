import React from "react";
import  {useEffect} from "react";
import Skin from "../../../Components/User/SubPage/Skin";
import Hair from "../../../Components/User/SubPage/Hair";
import Fragnance from "../../../Components/User/SubPage/Fragnance";
import BathAndHygiene from "../../../Components/User/SubPage/BathandHyginie";
import Makeup from "../../../Components/User/SubPage/Makeup"; // Make sure path is correct

const Women = () => {
    useEffect(() => {
          window.scrollTo(0, 0); // Scroll to top on mount
        }, []);
  return (
    <div style={{ padding: "20px", paddingTop:"3%" }}>
      <div style={{ marginBottom: "60px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "1000px" }}>
          <Makeup showSlider={false} headingColor="black" isWomenPage={true} />
        </div>
      </div>

      <div style={{ marginBottom: "80px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "1400px" }}>
          <Skin showSlider={false} headingColor="black" isWomenPage={true} />
        </div>
      </div>

      <div style={{ marginBottom: "60px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "1400px" }}>
          <Hair showSlider={false} headingColor="black" isWomenPage={true}/>
        </div>
      </div>

      <div style={{ marginBottom: "60px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "1000px" }}>
          <Fragnance showSlider={false} headingColor="black" isWomenPage={true} />
        </div>
      </div>

      <div style={{ marginBottom: "60px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <BathAndHygiene showSlider={false} headingColor="black" isWomenPage={true} />
        </div>
      </div>

      
    </div>
  );
};

export default Women;
