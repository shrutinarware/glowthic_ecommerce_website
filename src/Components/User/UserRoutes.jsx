import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Main Pages
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Brands from './Brands'

// Categories
import Makeup from './SubPage/Makeup'
import Skin from './SubPage/Skin'
import Haircare from './SubPage/Hair'
import Fragnance from './SubPage/Fragnance'
import BathAndHygiene from './SubPage/BathandHyginie'

// Sub Pages
import Eyes from './SubPage/Eye'
import Lips from './SubPage/Lip'
import Nails from './SubPage/Nails'
import Moisturizers from './SubPage/Moisturizers'
import Cleansers from './SubPage/Cleansers'
import Serums from './SubPage/Serums'
import Sunscreens from './SubPage/Sunscreens'
import FaceMasks from './SubPage/FaceMasks'
import BodyLotions from './SubPage/Bodylotions'
import Scrubs from './SubPage/Scrubs'
import Shampoo from './SubPage/Shampoo'
import Conditioners from './SubPage/Conditioner'
import HairSerums from './SubPage/HairSerum'
import HairMask from './SubPage/HairMask'
import HairColor from './SubPage/HairColor'
import HairGels from './SubPage/HairGels'
import HairOil from './SubPage/Hairoil'
import BodyWash from './SubPage/Bodywash'
import MensPerfume from './SubPage/MensPerfume'
import WomensPerfume from './SubPage/WomensPerfume'
import UnisexPerfumes from './SubPage/UnisexPerfumes'
import Deodrants from './SubPage/Deodrants'
import BodyMists from './SubPage/BodyMists'
import Soaps from './SubPage/Soaps'
import Shaving from './SubPage/Shaving'
import Waxing from './SubPage/Waxing'

// Categories of skin care
import OilySkin from './SubPage/OilySkin'
import DrySkin from './SubPage/DrySkin'
import NormalSkin from './SubPage/NormalSkin'
import CombinationSkin from './SubPage/CombinationSkin'

// Gender
import Women from './SubPage/Women'
import Men from './SubPage/Men'
import Face from "./SubPage/Face"
import Appliances from './SubPage/Appliances'
import HairDryer from './SubPage/HairDryer'
import HairStraightener from './SubPage/HairStraightner'
import HairCurler from './SubPage/HairCurler'
import Trimmers from './SubPage/Trimmers'
import FacialSteamers from './SubPage/FacialSteamers'
import Epilators from './SubPage/Epillators'
import Massage from './SubPage/MassageTools'

const UserRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/brands" element={<Brands />} />

        {/* Categories */}
        <Route path="/makeup" element={<Makeup />} />
        <Route path="/Skin" element={<Skin />} />
        <Route path="/Hair" element={<Haircare />} />
        <Route path="/Fragnance" element={<Fragnance />} />
        <Route path="/bath-hygiene" element={<BathAndHygiene />} />
        <Route path="/appliances" element={<Appliances />} />


        {/* Sub Pages */}
        <Route path="/face" element={<Face />} />
        <Route path="/eye" element={<Eyes />} />
        <Route path="/Lip" element={<Lips />} />
        <Route path="/Nail" element={<Nails />} />
        <Route path="/moisturizers" element={<Moisturizers />} />
        <Route path="/cleansers" element={<Cleansers />} />
        <Route path="/serums" element={<Serums />} />
        <Route path="/Sunscreens" element={<Sunscreens />} />
        <Route path="/Facemasks" element={<FaceMasks />} />
        <Route path="/Bodylotions" element={<BodyLotions />} />
        <Route path="/Scrubs" element={<Scrubs />} />
        <Route path="/shampoos" element={<Shampoo />} />
        <Route path="/conditioners" element={<Conditioners />} />
        <Route path="/hair-oils" element={<HairOil />} />
        <Route path="/hair-serum" element={<HairSerums />} />
        <Route path="/hair-mask" element={<HairMask />} />
        <Route path="/hair-color" element={<HairColor />} />
        <Route path="/hair-gels" element={<HairGels />} />
        <Route path="/mensperfumes" element={<MensPerfume />} />
        <Route path="/womensperfumes" element={<WomensPerfume />} />
        <Route path="/unisexperfumes" element={<UnisexPerfumes />} />
        <Route path="/deodorants" element={<Deodrants />} />
        <Route path="/bodymists" element={<BodyMists />} />
        <Route path="/soaps" element={<Soaps />} />
        <Route path="/bodywash" element={<BodyWash />} />
        <Route path="/shavingcreams" element={<Shaving />} />
        <Route path="/waxingneeds" element={<Waxing />} />
        <Route path= "/hair-dryers" element={<HairDryer/>}/>
        <Route path="/straighteners" element={<HairStraightener/>}/>
        <Route path="/curlers" element={<HairCurler/>}/>
        <Route path="/trimmers" element={<Trimmers/>}/>
        <Route path="/facial-steamers" element={<FacialSteamers/>}/>
        <Route path="/epilators" element={<Epilators/>}/>
       <Route path="/massage" element={<Massage/>}/>


        {/* Skin Care Types */}
        <Route path="/oily-skin" element={<OilySkin />} />
        <Route path="/dryskin" element={<DrySkin />} />
        <Route path="/normalskin" element={<NormalSkin />} />
        <Route path="/combinationskin" element={<CombinationSkin />} />

        {/* Gender */}
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        
      </Routes>
    </div>
  )
}

export default UserRoutes
