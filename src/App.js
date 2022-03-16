import React, { Suspense, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import CategoryStep from "./components/Content/CategoryStep/CategoryStep";
import GoTop from "./components/Content/Home/GoTop/GoTop";
import Footer from "./components/Footer/Footer";
import HeaderBot from "./components/Header/Bottom/HeaderBot";
import HeaderTop from "./components/Header/Top/HeaderTop";
import { HOME_PAGE } from "./constants/Pages";
import AppProvider from "./contexts/AppProvider";
import CartPage from "./pages/CartPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  const [currentPageApp, setCurrentPageApp] = useState("");

  const changeCurrentPage = (childData) => {
    setCurrentPageApp(childData);
  };

  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <HashRouter>
        <AppProvider>
          <div className="header">
            <HeaderTop />
            <HeaderBot />
            {currentPageApp !== HOME_PAGE && <CategoryStep />}
          </div>
          <Routes>
            <Route path="/" element={<HomePage callbackFunc={changeCurrentPage} />} />
            <Route path={`/:slug`} element={<CategoryDetailPage callbackFunc={changeCurrentPage} />} />
            <Route path={`/:slug/:slug`} element={<ProductDetailPage callbackFunc={changeCurrentPage} />} />
            <Route path={`/cart`} element={<CartPage callbackFunc={changeCurrentPage} />} />
          </Routes>
          <div className="footer">
            <Footer />
            <GoTop />
          </div>
        </AppProvider>
      </HashRouter>
    </Suspense>
  );
}

export default App;
