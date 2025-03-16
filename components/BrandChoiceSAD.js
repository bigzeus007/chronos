"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import styles from "../styles/Button.module.css";

import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

// On utilise MUI
import { Button, Grid2 } from "@mui/material";

import RdvChoice from "./RdvChoice";
import CarCardSAD from "./CarCardSAD";

export default function BrandChoiceSAD({
  editMode,
  setOption,
  setEditMode,
  dpt,
}) {
  const [brand, setBrand] = useState("ND");
  const [carInit, setCarInit] = useState({});

  return brand === "ND" ? (
    <Grid2 container spacing={2}>
      <Grid2>
        <Button
          variant="contained"
          onClick={() =>
            setEditMode({
              dpt: dpt,
              brand: "AUDI",
              photoUrl: "../public/AddSADCars.jpg",
              km: 0,
              model: "",
              carburant: 0,
              imm: "Immatriculation",
            })
          }
          className={styles.btn} // Si tu souhaites garder des styles personnalisés
        >
          AUDI
        </Button>
      </Grid2>
      <Grid2>
        <Button
          variant="contained"
          onClick={() =>
            setEditMode({
              id: "../public/AddSADCars.jpg",
              dpt: dpt,
              brand: "SKODA",
              photoUrl:
                "https://firebasestorage.googleapis.com/v0/b/terminal00.appspot.com/o/parkingSAD%2FAddSADCars.jpg?alt=media&token=e135e3e1-41f9-4064-8f9f-f5f611b37067",
              km: 0,
              model: "",
              carburant: 0,
              imm: "Immatriculation",
            })
          }
          className={styles.btn}
        >
          SKODA
        </Button>
      </Grid2>
    </Grid2>
  ) : (
    <CarCardSAD
      editMode={editMode}
      setOption={setOption}
      setEditMode={setEditMode}
    />
  );
}
