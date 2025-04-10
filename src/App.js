import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchCandidates } from "./redux/actions";
import AuthForm from "./components/AuthForm"; // Assuming renamed from Login
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ReferralForm from "./components/ReferralForm";
import Metrics from "./components/Metrics";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchCandidates());
    }
  }, [token, dispatch]);

  return (
    <div>
      <Navbar setToken={setToken} isAuthenticated={!!token} /> {/* Always render Navbar */}
      <div className="container mx-auto p-4">
        {!token ? (
          <AuthForm setToken={setToken} />
        ) : (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/refer" element={<ReferralForm />} />
            <Route path="/metrics" element={<Metrics />} />
          </Routes>
        )}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}

export default App;