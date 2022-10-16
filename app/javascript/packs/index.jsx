import React from "react";
import { createRoot } from "react-dom/client";
import App from "../components/App";
import AppLayout from "../components/AppLayout";
import Header from "../components/Header";
import '../styles/application.css';

document.addEventListener("DOMContentLoaded", () => {
  createRoot(document.getElementById("root")).render(
    <App />
  );
});