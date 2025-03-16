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

// Import des composants internes déjà migrés (ou à migrer)
import CarCard from "./CarCard"; // Assurez-vous qu'il est migré vers MUI
import CarCardCrvEditMode from "./profiles/carCardEditMode/CarCardCrvEditMode";

export default function CrdvWaiting({ setOption, carsWaiting, userIn }) {
  const cars = carsWaiting;
  const [editMode, setEditMode] = useState("ND");

  // Exemple de fonction de couleur de badge (si nécessaire)
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

  // Si on est en mode “liste” (pas d’édition)
  if (editMode === "ND") {
    return (
      <Container>
        <Grid2 container spacing={0.5} justifyContent="center">
          <Grid2 xs={12}>
            <Typography variant="h6" color="white">
              Liste des véhicules En attente CS
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

        {/* Bouton RETOUR */}
        <Grid2 container justifyContent="center" sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => setOption("ND")}
            className={styles.btn} // si vous souhaitez conserver un style custom
          >
            RETOUR
          </Button>
        </Grid2>
      </Container>
    );
  }

  // Sinon, on retourne le composant d'édition
  return (
    <CarCardCrvEditMode
      editMode={editMode}
      setOption={setOption}
      userIn={userIn}
      setEditMode={setEditMode}
    />
  );
}
