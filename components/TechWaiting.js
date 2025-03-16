"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/Button.module.css";
import { db } from "../firebase";
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

import CarCard from "./CarCard"; // Assurez-vous que CarCard est déjà migré vers MUI
import CarCardTechEditMode from "./profiles/carCardEditMode/CarCardTechEditMode";

export default function TechWaiting({ setOption, cars, userIn }) {
  const [editMode, setEditMode] = useState("ND");

  // Optionnel : si vous en avez besoin dans d'autres fonctions
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
        {/* En attente de réception */}
        <Grid2 container spacing={0.5} justifyContent="center">
          <Grid2 xs={12}>
            <Typography variant="h6" color="white">
              En attente de réception
            </Typography>
          </Grid2>
          <Grid2
            container
            spacing={2}
            justifyContent="flex-start"
            sx={{ mt: 1 }}
          >
            {cars.map((car) => (
              <Grid2 xs={6} sm={3} key={car.id}>
                <CarCard car={car} setEditMode={setEditMode} />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>

        {/* Nouveaux (si besoin d'afficher d'autres voitures) */}
        <Grid2 container spacing={0.5} justifyContent="center" sx={{ mt: 2 }}>
          <Grid2 xs={12}>
            <Typography variant="h6" color="white">
              Nouveaux
            </Typography>
          </Grid2>
          {/* Ici, si vous aviez une liste de nouveaux véhicules, vous pouvez la mapper */}
          <Grid2 container spacing={2} justifyContent="flex-start">
            {/* ... */}
          </Grid2>
        </Grid2>

        {/* Bouton RETOUR */}
        <Grid2 container justifyContent="center" sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => setOption("ND")}
            className={styles.btn} // si vous souhaitez conserver votre style custom
          >
            RETOUR
          </Button>
        </Grid2>
      </Container>
    );
  }

  // Sinon, on affiche le composant d'édition Tech
  return (
    <CarCardTechEditMode
      editMode={editMode}
      setOption={setOption}
      userIn={userIn}
      setEditMode={setEditMode}
    />
  );
}
