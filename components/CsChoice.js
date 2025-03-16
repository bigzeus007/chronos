"use client";
import React, { useState } from "react";
import { Button, Grid2 } from "@mui/material"; // Remplace NextUI
import styles from "../styles/Button.module.css";
import TakePicture from "./TakePicture";

export default function CsChoice({ setOption, brand, rdv }) {
  const [csSelected, setCsSelected] = useState("ND");

  // Audi + csSelected pas encore choisi
  if (brand === "AUDI" && csSelected === "ND") {
    return (
      <Grid2 container spacing={2}>
        <Grid2>
          <Button
            variant="contained"
            onClick={() => setCsSelected("AZIZ")}
            className={styles.btn}
          >
            AZIZ
          </Button>
        </Grid2>
        <Grid2>
          <Button
            variant="contained"
            onClick={() => setCsSelected("ABDEL")}
            className={styles.btn}
          >
            ABDEL
          </Button>
        </Grid2>
        <Grid2>
          <Button
            variant="contained"
            onClick={() => setCsSelected("BADR")}
            className={styles.btn}
          >
            BADR
          </Button>
        </Grid2>
      </Grid2>
    );
  }

  // Skoda + csSelected pas encore choisi
  if (brand === "SKODA" && csSelected === "ND") {
    return (
      <Grid2 container spacing={2}>
        <Grid2>
          <Button
            variant="contained"
            onClick={() => setCsSelected("SIMO")}
            className={styles.btn}
          >
            SIMO
          </Button>
        </Grid2>
      </Grid2>
    );
  }

  // Sinon, on passe à la prise de photo
  return (
    <TakePicture
      setOption={setOption}
      brand={brand}
      rdv={rdv}
      csSelected={csSelected}
    />
  );
}
