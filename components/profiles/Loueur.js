"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import styles from "../../styles/Button.module.css";
import { collection, onSnapshot } from "firebase/firestore";

// Import MUI
import { Button, Box } from "@mui/material";

import DptChoice from "../DptChoice";     // Assurez-vous qu'il est migré en MUI
import ModifierParc from "../ModifierParc"; // Assurez-vous qu'il est migré en MUI

export default function Loueur({ userIn }) {
  const [option, setOption] = useState("ND");
  const [cars, setCars] = useState([]);

  const parcListRef = collection(db, "parkingSAD");

  useEffect(() => {
    const unsubscribe = onSnapshot(parcListRef, (snapshot) => {
      const carsData = [];
      snapshot.forEach((doc) => {
        carsData.push(doc.data());
      });
      setCars(carsData);
    });
    return unsubscribe;
  }, [parcListRef]);

  if (option === "ND") {
    return (
      <Box>
        <Box className={styles.btn} mb={1}>
          <Button variant="contained" onClick={() => setOption("Modifier")}>
            Modifier
          </Button>
        </Box>
        <Box className={styles.btn}>
          <Button variant="contained" onClick={() => setOption("PARC")}>
            Parc
          </Button>
        </Box>
      </Box>
    );
  } else if (option === "Modifier") {
    return <ModifierParc setOption={setOption} cars={cars} />;
  } else if (option === "PARC") {
    return <DptChoice setOption={setOption} cars={cars} />;
  } else {
    return <div>error</div>;
  }
}
