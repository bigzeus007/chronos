"use client";
import React, { useState } from "react";
import styles from "../styles/Button.module.css";
import { db } from "../firebase";

// Import MUI
import { Button, Grid2 } from "@mui/material";

// Import des composants internes déjà migrés vers MUI
import TakePicture from "./TakePicture";
import CsChoice from "./CsChoice";

export default function RdvChoice({ setOption, brand }) {
  const [rdv, setRdv] = useState("ND");

  if (rdv === "ND") {
    return (
      <Grid2 container spacing={2}>
        <Grid2>
          <Button
            variant="contained"
            onClick={() => setRdv("RDV")}
            className={styles.btn}
          >
            Rendez-vous
          </Button>
        </Grid2>
        <Grid2>
          <Button
            variant="contained"
            onClick={() => setRdv("SRDV")}
            className={styles.btn}
          >
            Nouveau
          </Button>
        </Grid2>
      </Grid2>
    );
  }

  if (rdv === "RDV") {
    // Affichage du composant CsChoice
    return <CsChoice setOption={setOption} brand={brand} rdv={rdv} />;
  }

  // Sinon, si rdv === "SRDV", on passe à la prise de photo
  return (
    <TakePicture
      setOption={setOption}
      brand={brand}
      rdv={rdv}
      csSelected="ND"
    />
  );
}
