"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
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

import CsNouveaux from "../CsNouveaux"; // Assurez-vous que CsNouveaux est migré vers MUI
import CsWaiting from "../CsWaiting";   // Assurez-vous que CsWaiting est migré vers MUI

export default function Cs({ userIn }) {
  const [option, setOption] = useState("ND");

  const [cars, setCars] = useState([]);
  const [carsWaiting, setCarsWaiting] = useState([]);

  const parcListRef = collection(db, "parkingChronos");

  // Récupération "Reception02" (réception en cours)
  useEffect(() => {
    const q = query(
      parcListRef,
      where("csSelected", "==", userIn.prenom),
      where("step", "==", "Reception02"),
      orderBy("rdvTime", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const carsData = [];
      snapshot.forEach((doc) => carsData.push(doc.data()));
      setCars(carsData);
    });
    return unsubscribe;
  }, [parcListRef, userIn.prenom]);

  // Récupération "Reception03" (préstation en cours)
  useEffect(() => {
    const q = query(
      parcListRef,
      where("csSelected", "==", userIn.prenom),
      where("step", "==", "Reception03")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const carsDataWaiting = [];
      snapshot.forEach((doc) => carsDataWaiting.push(doc.data()));
      setCarsWaiting(carsDataWaiting);
    });
    return unsubscribe;
  }, [parcListRef, userIn.prenom]);

  if (option === "ND") {
    return (
      <Box>
        <Box className={styles.btn} mb={1}>
          <Button variant="contained" onClick={() => setOption("NOUVEAUX")}>
            Réception
          </Button>
        </Box>
        <Box className={styles.btn}>
          <Button variant="contained" onClick={() => setOption("WAITING")}>
            Préstation
          </Button>
        </Box>
      </Box>
    );
  } else if (option === "NOUVEAUX") {
    // Liste de véhicules en "Reception02"
    return (
      <CsNouveaux
        setOption={setOption}
        cars={cars}
        userIn={userIn}
      />
    );
  } else if (option === "WAITING") {
    // Liste de véhicules en "Reception03"
    return (
      <CsWaiting
        setOption={setOption}
        carsWaiting={carsWaiting}
        userIn={userIn}
      />
    );
  } else {
    return <div>error</div>;
  }
}
