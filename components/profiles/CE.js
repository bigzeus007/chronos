"use client";
import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "../../styles/Button.module.css";
import { staffList } from "../techList";

// Import MUI
import { Button } from "@mui/material";

export default function CE() {
  const handleSubmit = async (list) => {
    try {
      list.forEach((tech) => {
        addDoc(collection(db, "staffList"), tech);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={() => handleSubmit(staffList)}
      className={styles.btn} // si vous souhaitez conserver un style personnalisé
    >
      ADD USER
    </Button>
  );
}
