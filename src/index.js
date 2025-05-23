import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";


const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  
  <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
 
);