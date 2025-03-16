"use client";
import React, { useState } from "react";
import styles from "../styles/Button.module.css";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

// Import MUI
import { Button, Grid2 } from "@mui/material";

// import CarsList from "./CarsList"; // Ex. si vous avez un composant CarsList

export default function DptChoice({ setOption }) {
  const [dpt, setDpt] = useState("ND");

  // Si dpt === "ND", on propose des boutons pour choisir "Courtoisie" ou "TestDrive"
  if (dpt === "ND") {
    return (
      <Grid2 container spacing={2}>
        <Grid2>
          <Button
            variant="contained"
            onClick={() => setDpt("Courtoisie")}
            className={styles.btn}
          >
            Courtoisie
          </Button>
        </Grid2>
        <Grid2>
          <Button
            variant="contained"
            // Remplacez setBrand("TestDrive") par setDpt("TestDrive") si c'est un oubli
            onClick={() => setDpt("TestDrive")}
            className={styles.btn}
          >
            Test-Drive
          </Button>
        </Grid2>
      </Grid2>
    );
  }

  // Sinon, on affiche la liste des voitures (ou autre composant)
  return (
    <div>
      {/* Exemple si vous aviez un composant CarsList :
          <CarsList setOption={setOption} dpt={dpt} />
      */}
      CarsList
    </div>
  );
}
