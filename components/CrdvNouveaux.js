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

import CarCard from "./CarCard"; // à migrer ou déjà migré vers MUI
import CarCardCrvEditMode from "./profiles/carCardEditMode/CarCardCrvEditMode";

export default function CrdvNouveaux({ setOption, cars, userIn }) {
  const [editMode, setEditMode] = useState("ND");

  // Ex. si vous avez encore besoin de cette fonction
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

  // Si on est en mode “liste”
  if (editMode === "ND") {
    return (
      <Container>
        {/* Titre */}
        <Grid2 container spacing={0.5} justifyContent="center">
          <Grid2 xs={12}>
            <Typography variant="h6" color="white">
              Liste des véhicules non traités
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
            className={styles.btn} // si vous souhaitez garder un style custom
          >
            RETOUR
          </Button>
        </Grid2>
      </Container>
    );
  }

  // Sinon, on rend le composant d'édition
  return (
    <CarCardCrvEditMode
      editMode={editMode}
      setOption={setOption}
      userIn={userIn}
      setEditMode={setEditMode}
    />
  );
}
