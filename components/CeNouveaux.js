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

import CeCarCard from "./CeCarCard"; // Votre composant déjà migré vers MUI
import CarCardCeEditMode from "./profiles/carCardEditMode/CarCardCeEditMode";

// Si "csBadgeColor" n'est pas utilisé, vous pouvez le retirer
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

export default function CeNouveaux({ setOption, cars, carsWaiting, userIn }) {
  const [editMode, setEditMode] = useState("ND");

  return editMode === "ND" ? (
    <Container>
      {/* Liste des clients avec RDV */}
      <Grid2 container spacing={0.5} justifyContent="center">
        <Grid2 xs={12}>
          <Typography variant="h6" color="white">
            Clients avec RDV
          </Typography>
        </Grid2>
        <Grid2 container spacing={2} justifyContent="flex-start">
          {cars.map((car) => (
            <Grid2 xs={6} sm={3} key={car.id}>
              <CeCarCard car={car} setEditMode={setEditMode} />
            </Grid2>
          ))}
        </Grid2>
      </Grid2>

      {/* Liste des clients sans RDV */}
      <Grid2 container spacing={0.5} justifyContent="center" sx={{ mt: 2 }}>
        <Grid2 xs={12}>
          <Typography variant="h6" color="white">
            Clients sans RDV
          </Typography>
        </Grid2>
        <Grid2 container spacing={2} justifyContent="flex-start">
          {carsWaiting.map((car) => (
            <Grid2 xs={6} sm={3} key={car.id}>
              <CeCarCard car={car} setEditMode={setEditMode} />
            </Grid2>
          ))}
        </Grid2>
      </Grid2>

      {/* Bouton de retour */}
      <Grid2 container justifyContent="center" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => setOption("ND")}
          className={styles.btn} // si vous souhaitez conserver vos styles custom
        >
          RETOUR
        </Button>
      </Grid2>
    </Container>
  ) : (
    <CarCardCeEditMode
      editMode={editMode}
      setOption={setOption}
      userIn={userIn}
      setEditMode={setEditMode}
    />
  );
}
