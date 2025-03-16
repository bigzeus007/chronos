"use client";
import React, { useState } from "react";
import { db } from "../firebase";
import styles from "../styles/Button.module.css";

// Import MUI
import { Button, Grid2 } from "@mui/material";

import BrandChoiceSAD from "./BrandChoiceSAD";

export default function DptChoiceSAD({ editMode, setOption, setEditMode }) {
  const [dpt, setDpt] = useState("ND");

  if (dpt === "ND") {
    return (
      <Grid2 container spacing={2}>
        <Grid2>
          <Button
            variant="contained"
            onClick={() => setDpt("SAV")}
            className={styles.btn} // Si vous souhaitez appliquer un style personnalisé
          >
            SAV
          </Button>
        </Grid2>
        <Grid2>
          <Button
            variant="contained"
            onClick={() => setDpt("COMMERCIAL")}
            className={styles.btn}
          >
            COMMERCIAL
          </Button>
        </Grid2>
      </Grid2>
    );
  }

  // Sinon, on affiche le composant BrandChoiceSAD
  return (
    <BrandChoiceSAD
      editMode={editMode}
      setOption={setOption}
      setEditMode={setEditMode}
      dpt={dpt}
    />
  );
}
