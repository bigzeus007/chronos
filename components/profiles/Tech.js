"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import styles from "../../styles/Button.module.css";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

// Import MUI
import { Button, Box } from "@mui/material";

// Assurez-vous que TechWaiting et CsWaiting soient également migrés vers MUI
import TechWaiting from "../TechWaiting";
import CsWaiting from "../CsWaiting";

export default function Tech({ userIn }) {
  const [option, setOption] = useState("ND");
  const [cars, setCars] = useState([]);

  const parcListRef = collection(db, "parkingChronos");

  // Charger la liste des véhicules pour lesquels le tech en cours (userIn.nom) est présent dans techTeamsUpdated
  useEffect(() => {
    const q = query(
      parcListRef,
      where("techTeamsUpdated", "array-contains", userIn.nom),
      orderBy("rdvTime", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const carsData = [];
      snapshot.forEach((doc) => {
        carsData.push(doc.data());
      });
      setCars(carsData);
    });

    return unsubscribe; // cleanup
  }, [parcListRef, userIn.nom]);

  if (option === "ND") {
    return (
      <Box>
        <Box className={styles.btn} mb={1}>
          <Button variant="contained" onClick={() => setOption("WAITING")}>
            En attente
          </Button>
        </Box>
        <Box className={styles.btn}>
          <Button variant="contained" onClick={() => setOption("NOUVEAUX")}>
            RAS
          </Button>
        </Box>
      </Box>
    );
  } else if (option === "WAITING") {
    // Affiche TechWaiting
    return <TechWaiting setOption={setOption} cars={cars} userIn={userIn} />;
  } else if (option === "NOUVEAUX") {
    // Affiche CsWaiting (même si le nom “NOUVEAUX” fait penser qu’on pourrait afficher un composant “TechNouveaux”)
    return <CsWaiting setOption={setOption} cars={cars} userIn={userIn} />;
  } else {
    return <div>error</div>;
  }
}
