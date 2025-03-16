"use client";

import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

// Imports MUI
import { Box, Button, Typography, CircularProgress } from "@mui/material";

export default function EntrerButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      // Mise en page en "flex" qui centre verticalement et horizontalement
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        // On peut simuler la transition "bg-gradient-to-b from-purple-700 to-indigo-900" avec du CSS
        background: "linear-gradient(to bottom, #7e22ce, #312e81)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color="white"
        marginBottom={4}
      >
        Welcome to Chronos
      </Typography>

      {error && (
        <Typography color="error" marginBottom={2}>
          Erreur : {error}
        </Typography>
      )}

      <Button
        onClick={handleGoogleSignIn}
        variant="contained"
        disabled={loading}
        // Personnalisation des couleurs et du style du bouton
        sx={{
          minWidth: 220,
          height: 48,
          backgroundColor: loading ? "grey.500" : "primary.main",
          "&:hover": {
            backgroundColor: loading ? "grey.500" : "primary.dark",
          },
        }}
      >
        {loading ? (
          // On peut afficher un spinner MUI ou un simple texte
          <>
            <CircularProgress
              size={20}
              sx={{ color: "white", marginRight: 1 }}
            />
            Chargement...
          </>
        ) : (
          "Connexion avec Gmail"
        )}
      </Button>
    </Box>
  );
}
