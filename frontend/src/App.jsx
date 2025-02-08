import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux"; // Import Redux Provider
import store from "./Redux/Store.js"; // Import your Redux store
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Registration.jsx";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./routes/ProtectedRoutes";

export default function App() {
  return (
    <Provider store={store}> {/* Wrap the entire app with Provider */}
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
