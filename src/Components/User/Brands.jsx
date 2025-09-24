import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Import brand images
import Bblunt from "../../assets/Brands/BBLunt.jpg";
import Bglam from "../../assets/Brands/Bglam.webp";
import Blueheaven from "../../assets/Brands/Blueheaven.png";
import Bodywise from "../../assets/Brands/bodywise.png";
import Biotique from "../../assets/Brands/biotique.png";
import Cetaphil from "../../assets/Brands/cetaphil.jpg";
import Dotkey from "../../assets/Brands/dot&key.png";
import Dove from "../../assets/Brands/dove.png";
import Elle from "../../assets/Brands/elle.png";
import Engage from "../../assets/Brands/engage.png";
import Fiama from "../../assets/Brands/fiama.png";
import Fogg from "../../assets/Brands/fogg.jpg";
import Garnier from "../../assets/Brands/garnier.jpg";
import Gillete from "../../assets/Brands/gillete.png";
import Havels from "../../assets/Brands/havells.png";
import Headshoulder from "../../assets/Brands/HS.jpg";
import Himalya from "../../assets/Brands/himalaya.jpg";
import HudaB from "../../assets/Brands/Hudabeauty.png";
import Indulekha from "../../assets/Brands/indulekha.jpg";
import Kaybeauty from "../../assets/Brands/kay.jpg";
import Lakme from "../../assets/Brands/Lakmé_logo.jpg";
import Loreal from "../../assets/Brands/loreal paris.png";
import Lotus from "../../assets/Brands/lotus.jpg";
import Mac from "../../assets/Brands/MAC.jpg";
import Maybelline from "../../assets/Brands/maybelline.png";
import Mamaearth from "../../assets/Brands/mamaearth.png";
import Mcaffine from "../../assets/Brands/m caffine.png";
import Minimalist from "../../assets/Brands/Minimalist.jpg";
import Plum from "../../assets/Brands/plum.jpg";
import Sugar from "../../assets/Brands/SUGAR-Cosmetics-Logo.jpg";
import Venus from "../../assets/Brands/Venus.png";
import Axe from "../../assets/Brands/AXE-Logo.jpg";
import Bellavita from "../../assets/Brands/bellavita.png";
import BioE from "../../assets/Brands/bio essence .jpg";
import Beardo from "../../assets/Brands/beardo.jpg";
import Sheth from "../../assets/Brands/Sheth.jpg";
import Dyson from "../../assets/Brands/dyson.png";
import Envy from "../../assets/Brands/envy.png";
import Forest from "../../assets/Brands/Forest-Essentials-Logo.png";
import Insight from "../../assets/Brands/insight.png";
import Lux from "../../assets/Brands/Lux_logo.jpg";
import Myglamm from "../../assets/Brands/Myglamm.jpg";
import Mars from "../../assets/Brands/Mars.png";
import Nivea from "../../assets/Brands/Nivea_Logo.png";
import Ponds from "../../assets/Brands/ponds.jpg";
import Pears from "../../assets/Brands/pears.jpg";
import Renee from "../../assets/Brands/Renee.jpg";
import Swiss from "../../assets/Brands/SwissB.jpg";
import St from "../../assets/Brands/Stbotnica.jpg";
import Streax from "../../assets/Brands/streax.png";
import Tresemme from "../../assets/Brands/tresemme.jpg";
import Derma from "../../assets/Brands/derma.png";
import Vaseline from "../../assets/Brands/vaseline.jpg";
import Vlcc from "../../assets/Brands/vlcc.png";
import Vijohn from "../../assets/Brands/vijohn.jpg";
import Wow from "../../assets/Brands/wow.jpg";
import Wild from "../../assets/Brands/wildstone.jpg";
import Wishcare from "../../assets/Brands/wishcare.jpg";
import Yardley from "../../assets/Brands/yardley.jpg";
import Joy from "../../assets/Brands/joy.png";
import Boro from "../../assets/Brands/boropls.jpg";
import Forever from "../../assets/Brands/forever.jpg";
import Acne from "../../assets/Brands/acne.png";

const Brands = () => {
  const brandList = [
    { id: 1, name: "Acne Star", link: "", image: Acne },
    { id: 2, name: "B'Glam", link: "", image: Bglam },
    { id: 3, name: "B Blunt", link: "", image: Bblunt },
    { id: 4, name: "Bodywise", link: "", image: Bodywise },
    { id: 5, name: "Biotique", link: "", image: Biotique },
    { id: 6, name: "Cetaphil", link: "", image: Cetaphil },
    { id: 7, name: "Dot & Key", link: "", image: Dotkey },
    { id: 8, name: "Dove", link: "", image: Dove },
    { id: 9, name: "Elle 18", link: "", image: Elle },
    { id: 10, name: "Engage", link: "", image: Engage },
    { id: 11, name: "Fiama", link: "", image: Fiama },
    { id: 12, name: "Fogg", link: "", image: Fogg },
    { id: 13, name: "Garnier", link: "", image: Garnier },
    { id: 14, name: "Gillette", link: "", image: Gillete },
    { id: 15, name: "Gillette Venus", link: "", image: Venus },
    { id: 16, name: "Havells", link: "", image: Havels },
    { id: 17, name: "Head & Shoulders", link: "", image: Headshoulder },
    { id: 18, name: "Heaven", link: "", image: Blueheaven },
    { id: 19, name: "Himalaya Herbals", link: "", image: Himalya },
    { id: 20, name: "Huda Beauty", link: "", image: HudaB },
    { id: 21, name: "Indica", link: "", image: "" },
    { id: 22, name: "Indulekha", link: "", image: Indulekha },
    { id: 23, name: "Kay Beauty", link: "", image: Kaybeauty },
    { id: 24, name: "Loreal Paris", link: "", image: Loreal },
    { id: 25, name: "Lakme", link: "", image: Lakme },
    { id: 26, name: "Lotus Herbal", link: "", image: Lotus },
    { id: 27, name: "Maybelline New York", link: "", image: Maybelline },
    { id: 28, name: "MAC Cosmetics", link: "", image: Mac },
    { id: 29, name: "MCaffeine", link: "", image: Mcaffine },
    { id: 30, name: "Mamaearth", link: "", image: Mamaearth },
    { id: 31, name: "Minimalist", link: "", image: Minimalist },
    {
      id: 32,
      name: "Plum",
      link: "https://www.amazon.in/stores/PlumGoodness/page/6B75F045-88D3-4496-A378-9D0BCBDD9929?lp_asin=B0191U3LU0&ref_=ast_bln&store_ref=bl_ast_dp_brandLogo_sto",
      image: Plum,
    },
    { id: 33, name: "Sugar Cosmetics", link: "", image: Sugar },
    {
      id: 34,
      name: "Axe",
      image: Axe,
      link: "https://aax-eu-zaz.amazon.in/x/c/JNxU1u37oAsEVqY7OPzHxpYAAAGZM0LG-AoAAAH2AQBvbm9fdHhuX2JpZDMgICBvbm9fdHhuX2ltcDEgICDK4a0j/clv1_CEuOPUxokZA0iHrVAckR_H3eXX9QTYAKrJUcqXqv-cxxx38G8RSqBv018HHz9hvVjq0yzpNb3X7OfU15AmcAXGZfCH6fC8XYDHsyfkNqFx2EEql4skfB8IkGXCRgU-W6XJeXalC7rdIQEQQ8kV_3ZVhXLA8QC8x8H15tWbp4Xgyay_2WjkwrSxutOI2vKbYuDzUcfMyagcpNBHhtJZhsefQQh8yliMIIKin6O61_zAYOsoJhkeWuV2gvjBmW5lJBN2PMN-SRnR9AjX0lL9xFahCwdXiTzSjwM7id5YjwaLUYLWeP1aK1xkuNcA7FBIOT3_cq0eVrbNPflr6BPMSKG8ly2d56cjVrjZ4S9cx7NrEBzl17AlKW_yWr3JYqfnqDdhxLjmOcuEw1_xDIJemvSEoGfJTZhPBne-wSBml9tlZkUux_rAVrRF9I0bxcInIFH-Gzc_r6mO-bWyVNaReipMUTeUmOnmCYQTtgTbV7n9mGD0dk7s2izRPtS0xNFricmfda3FxGEYwynzuAoU-5yQODWwRmcmo6djaNSR6rH7DofgKiPz1B7kQPBXjrdEHsefg0kPl-VBmGjLx6pM0NATfcADpCyR1V8u8umKazrWoovLyO4a4ZPXHk5F3eTZyUFmEaTc0_BDZj7M16FpJ5hBRAzKDZYTN6aSEnhOd-9bU8I38gVXqEulUbhQ_0XMNZ6BcS1lMx4PcY_t4MEHGVPmtHzbb3MMrO7PznC0kLPgPukDWpfdZX7wBUzPQbSP2-rKhNGCPDjknV7BO4C3zvJRNiqTjUCExQsMBHVOQLRAqN-FMsB_58jgRzoruOTVDEa-acQxJH6Q_wpt5iWsFxk6G8tkZIhce1OruFrsietRiOh1iT93A06hPLh2C-4wmgiP8WusIimBHMAMslSNgRCtui7OOboCN1FB8LJSXilXPihxB1HWYEZm1oUCbM6W2alCqHL-XV7ouJs9a55j-aWJxHFOa7X4XP5me0eTB-OJ4WWyQlTlVod6r9xDL4E3Yjcn6N86hf_gwxIpw-qeWF4gVhtjBSVdyqgwtz_I55viNeVXKVdt6NJw77TIJHPPJ7ZCmFV5zfNB0YF4zic4GLsML-aXmC57dsasksAyJwGJuxGFCxOrpMpXBcILaEr8zprMU5Ttr6qB4pA-ERn0cKTk4ke8n1Fl7fM5krn5L5prPCsS-R9GvH06Y5vClNYcAoL0C8KFf-6F-wUhc9gAXUL4yE2el_4Yhh6jGJ2phRJkXdI10yVlqyxUbhtCIMfa7HIbAtv-uxXkn0SahlZKAmmVMt7LFe0aeTwQGIkG2zCN_QddJFY9rr-_AkpAeS7ogURvENTQ22xXzyjtIAdgYV547w54YY405xccNkAb1Nib4VkW-UIEy85-yKAk24eodKMkH1fmGjWyDABhY8dIuBUd6QjkG1Nklz2aIpwuzRkzxsdz1H7a0_E_IvHAugOTmdrCUjPFbxn7y8mTvBEirCcQ7wxRuXHeQZ7KIUwPMp1jRxim3MHkmbDWB1_bgfkPKEtHr7HRNyQfNGb6PsUoYMLhe4ocjoN0nbBneyBoYAu56-5MfL7bW9U6RzAOUwtMg1W9b1bWL3-5DDF8XRPUIoYRVa4dvuyLED_Jr-wnDEw4a4fmXVExCYoDBAi3ZHGaKWYiPiGFPJ8ucoD3bViCNvzowcYgT1d0Z9BLtAl_c7Z6qpC-4KpI7LRFwz8eyavs65laF-KIuZvTRju1Wlm4YfdBm2wAlPsBbHkqV4HS2a5VqCm-frnuACVIlUzn7yGdEcpYgf41qtrYl7M8FlKYBl20kpLfnLwXLRfvSfewTslaq1LaO4ypYN8_w_RP6F_sJDnhkEXs0aJbwQ_fXdGHnIOJqXj4YLK8OOW9hxbhtzji1RyeDrF6yFg1E2c5y0yOpUkvHZKHAFg_qviS9JTw3ITcSRmgNd3-cBcZfFjagXiUk8Ki1RxMXtav83q2U9p46OMAhx3-xSbmp4aVIGlY7vtv04IH6zBC9qxRLpuWQTdfqaeCQBN4X7GsSAwEGl6i9nQ5J2TlddWpcIpxU4yPPEsdDkkOMrecW5TOw1cZ8PE68PmYRANkQHe6gz33JhEp6T_SlcKkNmDcS9N33IDTzjLmhvWM7o8P3oHK5M1UYOUN2KPeA2ewrqcrYqgdkQql2rVj0HuxgDY08taxt-S3A6jlX7abu2-SEcuVTRL4t7ausmd88tZ6q1buK4PN-BJ5PavkxKhEtSr0Q/https://www.amazon.in/stores/page/0BD0718E-0268-4EC9-9354-15C29CC84042/?_encoding=UTF8&store_ref=SB_A0944622MM6JA5U3YGEA-A0435730ZJBFMGKV2XAO&pd_rd_plhdr=t&aaxitk=7a6880deb1bdbbbdcfac3186cd46c323&hsa_cr_id=0&lp_asins=B09268KD7J%2CB09264ZY38%2CB09JG4GHS3&lp_query=all%20product%20link%20of%20axe%20deodorant&lp_slot=auto-sparkle-hsa-tetris&aref=eOk2qktQPi&ref_=sbx_be_s_sparkle_lsi4d_cta&pd_rd_w=9SgMb&content-id=amzn1.sym.cbe1d71a-30e3-45dc-b787-bad221b13c68%3Aamzn1.sym.cbe1d71a-30e3-45dc-b787-bad221b13c68&pf_rd_p=cbe1d71a-30e3-45dc-b787-bad221b13c68&pf_rd_r=SDHHSR8WF812JV7XV1T9&pd_rd_wg=EmCLx&pd_rd_r=e2549f04-da64-454f-bded-3c25db23374f",
    },
    { id: 35, name: "Bella Vita", link: "", image: Bellavita },
    { id: 36, name: "Bio Essence", link: "", image: BioE },
    { id: 37, name: "Beardo", link: "", image: Beardo },
    { id: 38, name: "Dr.Sheth's", link: "", image: Sheth },
    { id: 39, name: "Dyson", link: "", image: Dyson },
    { id: 40, name: "Envy", link: "", image: Envy },
    { id: 41, name: "Forest Essential", link: "", image: Forest },
    { id: 42, name: "Insight ", link: "", image: Insight },
    { id: 43, name: "Lux", link: "", image: Lux },
    { id: 44, name: "My Glamm", link: "", image: Myglamm },
    { id: 45, name: "Mars", link: "", image: Mars },
    { id: 46, name: "Nivea", link: "", image: Nivea },
    { id: 47, name: "Ponds", link: "", image: Ponds },
    { id: 48, name: "Pears", link: "", image: Pears },
    { id: 49, name: "Renee", link: "", image: Renee },
    { id: 50, name: "Swiss Beauty", link: "", image: Swiss },
    { id: 51, name: "St.Botnica", link: "", image: St },
    { id: 52, name: "Streax", link: "", image: Streax },
    { id: 53, name: "Tresmme", link: "", image: Tresemme },
    { id: 54, name: "The Derma Co", link: "", image: Derma },
    { id: 55, name: "Vaseline", link: "", image: Vaseline },
    { id: 56, name: "VLCC", link: "", image: Vlcc },
    { id: 57, name: "Vi John", link: "", image: Vijohn },
    { id: 58, name: "WOW Skin Science", link: "", image: Wow },
    { id: 59, name: "Wild Stone", link: "", image: Wild },
    { id: 60, name: "Wishcare", link: "", image: Wishcare },
    { id: 61, name: "Yardley London", link: "", image: Yardley },
    { id: 62, name: "Joy", link: "", image: Joy },
    { id: 63, name: "Boroplus", link: "", image: Boro },
    { id: 64, name: "Forever 21", link: "", image: Forever },
  ];

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location.hash === "#brandsyoulove") {
      setTimeout(() => {
        const element = document.getElementById("brandsyoulove");
        if (element) {
          const yOffset = -100; // 👈 adjust based on Topbar height
          const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  const [searchTerm, setSearchTerm] = useState(""); // ✅ Add this

  const sortedBrands = [...brandList]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div
      style={{
        padding: "80px 40px",
        fontFamily: "'Segoe UI', sans-serif",
        background: "#fcf6f2",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <h1
        id="brandsyoulove"
        style={{
          textAlign: "center",
          fontSize: "38px",
          color: "#D63384",
          fontFamily: "cursive",
          marginBottom: "10px",
        }}
      >
        Brands You Love
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "18px",
          color: "#444",
          marginBottom: "30px",
        }}
      >
        Explore your favorite beauty and skincare brands
      </p>

      {/* Search Input */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        <input
          type="text"
          placeholder="Search brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            height: "45px",
            width: "320px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "0 15px",
            fontSize: "16px",
            background: "#fffaf7",
          }}
        />
      </div>

      {/* Brands Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "25px",
          padding: "0 10px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {sortedBrands.length > 0 ? (
          sortedBrands.map((brand) => (
            <div
              key={brand.id}
              style={{
                textAlign: "center",
                background: "#fff",
                border: "1px solid #e0cfcf",
                borderRadius: "12px",
                padding: "15px 10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <a
                href={brand.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#D63384",
                  fontWeight: "500",
                  fontSize: "18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {brand.image && (
                  <img
                    src={brand.image}
                    alt={brand.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                )}
                {brand.name}
              </a>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No matching brands found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Brands;
