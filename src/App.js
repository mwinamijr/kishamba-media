import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/HomeScreen";
import About from "./screens/AboutScreen";
import Contact from "./screens/ContactScreen";
import NewsScreen from "./screens/NewsScreen";
import SportsScreen from "./screens/SportsScreen";
import LoginScreen from "./screens/LoginScreen";
import NotFoundPage from "./screens/404Page";
import RegisterScreen from "./screens/RegisterScreen";
import AdminDashboard from "./screens/admin/AdminDashboard";
import PrivateAdminRoute from "./screens/PrivateAdminRoute";
import Unauthorized from "./screens/admin/Unauthorized";

const AppContent = () => {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news-details" element={<NewsScreen />} />
        <Route path="/sports" element={<SportsScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute>
              <AdminDashboard />
            </PrivateAdminRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
