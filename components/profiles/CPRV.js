"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import styles from "../../styles/Button.module.css";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

// Import MUI
import { Button, Box } from "@mui/material";

// Import de vos composants déjà migrés vers MUI
import CrdvNouveaux from "../CrdvNouveaux";
import CrdvWaiting from "../CrdvWaiting";

export default function CRDV({ userIn }) {
  const [option, setOption] = useState("ND");

  const [cars, setCars] = useState([]);
  const [carsWaiting, setCarsWaiting] = useState([]);

  const parcListRef = collection(db, "parkingChronos");

  // Récupération des véhicules "Reception01" (cars)
  useEffect(() => {
    const q = query(parcListRef, where("step", "==", "Reception01"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const carsData = [];
      snapshot.forEach((doc) => {
        carsData.push(doc.data());
      });
      setCars(carsData);
    });
    return unsubscribe;
  }, [parcListRef]);

  // Récupération des véhicules "Reception02" (carsWaiting)
  useEffect(() => {
    const q = query(parcListRef, where("step", "==", "Reception02"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const carsDataWaiting = [];
      snapshot.forEach((doc) => {
        carsDataWaiting.push(doc.data());
      });
      setCarsWaiting(carsDataWaiting);
    });
    return unsubscribe;
  }, [parcListRef]);

  if (option === "ND") {
    return (
      <Box>
        <Box className={styles.btn} mb={1}>
          <Button
            variant="contained"
            onClick={() => setOption("NOUVEAUX")}
          >
            Nouveaux
          </Button>
        </Box>
        <Box className={styles.btn}>
          <Button
            variant="contained"
            onClick={() => setOption("WAITING")}
          >
            En attente
          </Button>
        </Box>
      </Box>
    );
  } else if (option === "NOUVEAUX") {
    return (
      <CrdvNouveaux
        setOption={setOption}
        cars={cars}
        userIn={userIn}
      />
    );
  } else if (option === "WAITING") {
    return (
      <CrdvWaiting
        setOption={setOption}
        carsWaiting={carsWaiting}
        userIn={userIn}
      />
    );
  } else {
    return <div>error</div>;
  }
}
