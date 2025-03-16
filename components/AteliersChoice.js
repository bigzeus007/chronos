"use client";
import React from "react";
import { Button, Grid2 } from "@mui/material"; // <-- MUI
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import RdvChoice from "./RdvChoice";
import TechChoice from "./TechChoice";

// Optionnel, si tu veux garder un style custom pour tes boutons.
import styles from "../styles/Button.module.css";

export default function AteliersChoice({
  editMode,
  setOption,
  userIn,
  setEditMode,
  atelier,
  setAtelier,
}) {
  return atelier === "ND" ? (
    <Grid2 container spacing={2}>
      <Grid2>
        <Button
          variant="contained"
          onClick={() => setAtelier("Express")}
          className={styles.btn} // Optionnel, si tu veux appliquer tes .css
        >
          Express
        </Button>
      </Grid2>
      <Grid2>
        <Button
          variant="contained"
          onClick={() => setAtelier("Mecanique")}
          className={styles.btn}
        >
          Mecanique
        </Button>
      </Grid2>
      <Grid2>
        <Button
          variant="contained"
          onClick={() => setAtelier("Diagnostic")}
          className={styles.btn}
        >
          Diagnostic
        </Button>
      </Grid2>
      <Grid2>
        <Button
          variant="contained"
          onClick={() => setAtelier("Carrosserie")}
          className={styles.btn}
        >
          Carrosserie
        </Button>
      </Grid2>
    </Grid2>
  ) : (
    <TechChoice
      setOption={setOption}
      atelier={atelier}
      setAtelier={setAtelier}
      editMode={editMode}
      userIn={userIn}
      setEditMode={setEditMode}
    />
  );
}
