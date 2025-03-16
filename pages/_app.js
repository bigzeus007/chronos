// pages/_app.js
import React from "react";
import "@/styles/globals.css";

// Import MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  // Personnalisez votre palette, vos polices, etc.
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline applique un reset cohérent de styles */}
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
