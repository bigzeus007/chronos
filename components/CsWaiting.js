"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/Button.module.css";
import { db, storage } from "../firebase";
import {
  collection,
  getDocs,
  orderBy,
  onSnapshot,
  doc,
  query,
  where,
} from "firebase/firestore";

// Import MUI
import { Container, Grid2, Typography, Button } from "@mui/material";

import CarCard from "./CarCard"; // Assurez-vous que CarCard est migré vers MUI
import CarCardCsEditMode from "./profiles/carCardEditMode/CarCardCsEditMode";

export default function CsWaiting({ setOption, carsWaiting, userIn }) {
  const cars = carsWaiting;
  const [editMode, setEditMode] = useState("ND");

  // Fonction de couleur (optionnelle, si utilisée ailleurs)
  function csBadgeColor(key) {
    let csCovert = "";
    switch (key) {
      case "AZIZ":
        csCovert = "purple";
        break;
      case "ABDEL":
        csCovert = "green";
        break;
      case "BADR":
        csCovert = "orange";
        break;
      case "SIMO":
        csCovert = "blue";
        break;
      case "ND":
        csCovert = "red";
        break;
      default:
        csCovert = "gray";
        break;
    }
    return csCovert;
  }

  if (editMode === "ND") {
    return (
      <Container>
        {/* Titre */}
        <Grid2 container spacing={0.5} justifyContent="center">
          <Grid2 xs={12}>
            <Typography variant="h6" color="white">
              Suivi des ORs
            </Typography>
          </Grid2>

          {/* Liste des voitures */}
          <Grid2 container spacing={2} justifyContent="flex-start">
            {cars.map((car) => (
              <Grid2 xs={6} sm={3} key={car.id}>
                <CarCard car={car} setEditMode={setEditMode} />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>

        {/* Bouton de retour */}
        <Grid2 container justifyContent="center" sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => setOption("ND")}
            className={styles.btn} // si vous voulez conserver un style personnalisé
          >
            RETOUR
          </Button>
        </Grid2>
      </Container>
    );
  }

  // Si on est en mode édition, on affiche le composant dédié
  return (
    <CarCardCsEditMode
      editMode={editMode}
      setOption={setOption}
      userIn={userIn}
      setEditMode={setEditMode}
    />
  );
}
