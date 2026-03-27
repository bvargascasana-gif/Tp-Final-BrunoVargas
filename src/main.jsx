import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.jsx";
import { ContactProvider } from "./context/ContactContext";
import "./styles/global.css";


createRoot(document.getElementById("root")).render(
    <ContactProvider>
        <BrowserRouter>
            <App />
            <Analytics />
        </BrowserRouter>
    </ContactProvider>
);