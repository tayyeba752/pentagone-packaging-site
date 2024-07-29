import './App.css';
import ReactDOM from 'react-dom/client';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Main/Home/Home';
import Login from "./CombineComp/Login/Login";
import SignUp from './CombineComp/SignUp/SignUp';
import ContactUs from './Main/ContactUs/ContactUs';
import GetQuote from './Main/GetQuote/GetQuote';
import Products from './Main/Products/Products';
import Productopen from './Main/Products/Productopen';
import AdminDashboard from './Dashboard/DDLandingPage/AdminDashboard';
import AddProduct from './Dashboard/MainDashboard/Product/AddProduct';
import HomePage from './Dashboard/MainDashboard/HomePage/HomePage';
import InductryBox from './NavFoot/NavBar/InductryCard/InductryBox';
import CatagoryBox from './NavFoot/NavBar/CatagoryCard/CatagoryBox';
import MaterialBox from './NavFoot/NavBar/MaterialCard/MaterialBox';
import ShapeBox from './NavFoot/NavBar/ShapeCard/ShapeBox';
import AddNavBars from './Dashboard/MainDashboard/AddNavBars/AddNavBar';
import GetQuoteInfo from './Dashboard/MainDashboard/GetQuoteInfo/GetQuoteInfo';
import GetaQuote from './Main/GetQuote/GetaQuote';
import IndustriesNav from './Main/Products/IndustriesNav';
import CatagoriesNav from './Main/Products/CatagoriesNav';
import ShapesNav from './Main/Products/ShapesNav';
import MaterialsNav from './Main/Products/MaterialsNav';
import Product2 from './Main/Home/Product2';
import { Helmet } from 'react-helmet';
import Env from "./Environments/Env";
import OtherBox from './NavFoot/NavBar/OtherCard/OtherBox';
import StickerLabel from './Main/Products/StickerLabel';
export default function App() {
  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>PentagonPackaging</title>
          <link rel="canonical" href={`${Env.link}`} />
          <meta
            name="description"
            content="PentagonPackaging, is just a click away! Find cheap and quality custom packaging and custom printed boxed along with your own packaging design."
          />
          <meta
            property="og:title"
            content="Pentagon Packaging: Buy the Best Custom Packaging Boxes"
          />
          <meta
            name="keywords"
            content="Pentagon Packaging: Buy the Best Custom Packaging Boxes"
          />
        </Helmet>
      </div>
      <BrowserRouter>
        <Routes>
          {/*   ===========   NavBar Page   =========== */}
          <Route path="/Industry/:id/:title" element={<InductryBox />} />
          <Route path="/Catagory/:id/:title" element={<CatagoryBox />} />
          <Route path="/Material/:id/:title" element={<MaterialBox />} />
          <Route path="/ShapeStyle/:id/:title" element={<ShapeBox />} />
          <Route path="/Others/:id/:title" element={<OtherBox />} />


          {/*   ===========   Mobile NavBar   =========== */}
          <Route path="/Industries" element={<IndustriesNav />} />
          <Route path="/StickerLabel" element={<StickerLabel />} />
          <Route path="/Catagories" element={<CatagoriesNav />} />
          <Route path="/ShapesAndStyle" element={<ShapesNav />} />
          <Route path="/Materials" element={<MaterialsNav />} />

          {/*   ===========   User Page   =========== */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/GetQuote" element={<GetQuote />} />
          <Route path="/GetaQuote/:id/:title" element={<GetaQuote />} />
          <Route path="/products" element={<Products />} />
          {/* <Route path="/l" element={<Product2 />} /> */}


          {/*   ===========   Combine Page   =========== */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Productopen/:title/:id" element={<Productopen />} />


          {/*   ===========   Admin Page   =========== */}
          <Route path="/Admin/Dashboard" element={<AdminDashboard />} />
          <Route path="/Admin/AddNavBar" element={<AddNavBars />} />
          <Route path="/Admin/HomePage" element={<HomePage />} />
          <Route path="/Admin/AddProduct" element={<AddProduct />} />
          <Route path="/Admin/GetQuote" element={<GetQuoteInfo />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

