import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/HomeScreen";
import About from "./screens/AboutScreen";
import Contact from "./screens/ContactScreen";
import NewsScreen from "./screens/NewsScreen";
import SportsScreen from "./screens/SportsScreen";

const App = () => {
  return (
    <Router>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<NewsScreen />} />
          <Route path="/sports" element={<SportsScreen />} />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
};

export default App;
