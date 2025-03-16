"use client";
import React, { useState } from "react";
import styles from "../../styles/Button.module.css";

// Import MUI
import { Button, Box } from "@mui/material";

import BrandChoice from "../BrandChoice";   // Assurez-vous qu'il est migré vers MUI
import PisteurParc from "../PisteurParc";   // Assurez-vous qu'il est migré vers MUI

export default function Pisteur() {
  const [option, setOption] = useState("ND");

  if (option === "ND") {
    return (
      <Box>
        <Box className={styles.btn} mb={1}>
          <Button
            variant="contained"
            onClick={() => setOption("ENTREE")}
          >
            Entrée
          </Button>
        </Box>
        <Box className={styles.btn}>
          <Button
            variant="contained"
            onClick={() => setOption("PARC")}
          >
            Parc
          </Button>
        </Box>
      </Box>
    );
  } else if (option === "ENTREE") {
    return <BrandChoice setOption={setOption} />;
  } else if (option === "PARC") {
    return <PisteurParc setOption={setOption} />;
  } else {
    return <div>error</div>;
  }
}
