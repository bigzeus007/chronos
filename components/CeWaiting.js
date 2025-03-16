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

// Composants MUI
import { Container, Grid2, Typography, Button } from "@mui/material";

import CarCard from "./CarCard"; // Assurez-vous que CarCard a déjà été migré vers MUI
import CarCardCeEditMode from "./profiles/carCardEditMode/CarCardCeEditMode";

export default function CeWaiting({ setOption, carsWaiting, cars, userIn }) {
  const [editMode, setEditMode] = useState("ND");

  // Exemple de fonction pour déterminer la couleur (non utilisée ici)
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

  // Si on n'est pas en mode édition, on affiche la liste des véhicules.
  if (editMode === "ND") {
    return (
      <Container>
        {/* Section : En attente de réception */}
        <Grid2 container spacing={0.5} justifyContent="center">
          <Grid2 xs={12}>
            <Typography variant="h6" color="white">
              En attente de réception
            </Typography>
          </Grid2>
          <Grid2 container spacing={2} justifyContent="flex-start">
            {cars.map((car) => (
              <Grid2 xs={6} sm={3} key={car.id}>
                <CarCard car={car} setEditMode={setEditMode} />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>

        {/* Section : Nouveaux */}
        <Grid2 container spacing={0.5} justifyContent="center" sx={{ mt: 2 }}>
          <Grid2 xs={12}>
            <Typography variant="h6" color="white">
              Nouveaux
            </Typography>
          </Grid2>
          <Grid2 container spacing={2} justifyContent="flex-start">
            {carsWaiting.map((car) => (
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
            className={styles.btn} // si vous voulez conserver un style custom
          >
            RETOUR
          </Button>
        </Grid2>
      </Container>
    );
  }

  // Sinon, on rend le composant d'édition
  return (
    <CarCardCeEditMode
      editMode={editMode}
      setOption={setOption}
      userIn={userIn}
      setEditMode={setEditMode}
    />
  );
}
