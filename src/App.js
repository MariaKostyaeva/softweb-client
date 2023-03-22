import React from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import './styles/App.css';
import NavBar from "./components/NavBar/NavBar";
import Catalog from "./pages/Catalog";
import Footer from "./components/Footer/Footer";
import DeveloperPage from "./pages/DeveloperPage";
function App() {
  return (
      <div className="page-container">
      <BrowserRouter>
          <NavBar/>
          <div className="content-wrap">
              <AppRouter>
                  <Catalog/>
              </AppRouter>
          </div>
          <Footer/>
      </BrowserRouter>
      </div>
  );
}
export default App;
