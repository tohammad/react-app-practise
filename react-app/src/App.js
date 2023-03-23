import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Login = lazy(() => import("./components/Login"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const ErrorHandler = lazy(() => import("./components/ErrorHandler"));

const App = () => {
  return (
    <>
      <NavBar />
      <Suspense fallback={<div className="container">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<ErrorHandler />} />
      </Routes>
      </Suspense>
    </>
  );
};

export default App;
