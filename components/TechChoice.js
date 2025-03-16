"use client";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

// Import MUI
import {
  Container,
  Grid2,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";

import styles from "../styles/Button.module.css";

export default function TechChoice({
  setOption,
  atelier,
  setAtelier,
  editMode,
  userIn,
  setEditMode,
}) {
  const [tech, setTech] = useState("ND");
  const [repairTime, setRepairTime] = useState(0);
  const [techList, setTechlist] = useState([]);

  // Référence Firestore pour la liste des techniciens
  const techListRef = collection(db, "staffList");

  // Chargement de la liste des techniciens
  useEffect(() => {
    const q = query(
      techListRef,
      where("job", "==", "Tech"),
      where("service", "==", atelier),
      orderBy("nom", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const techData = [];
      snapshot.forEach((doc) => techData.push(doc.data()));
      setTechlist(techData);
    });
    return unsubscribe; // cleanup
  }, [atelier, techListRef]);

  // Référence du véhicule à modifier
  const carRef = doc(db, "parkingChronos", `${editMode.id}`);

  // On récupère l'ancienne durée de réparation du tech concerné (si elle existe déjà)
  const lastRepairTime = editMode[tech]?.repairTime
    ? Number(editMode[tech].repairTime)
    : 0;
  // Somme de l'ancienne durée + la nouvelle
  const updatedRepairTime = repairTime + lastRepairTime;

  // Historique des techniciens ayant déjà travaillé sur ce véhicule
  const techTeams = editMode.techTeamsUpdated ? editMode.techTeamsUpdated : [];

  // Gestion de la mise à jour Firestore
  const handleSubmit = async (mode) => {
    try {
      await updateDoc(carRef, {
        techTeamsUpdated: [...techTeams, tech],
        [tech]: {
          repairTime: updatedRepairTime,
          workingTime: 0,
          workStatus: "Pending",
        },
        step: mode === "Ajouter" ? "Prestation01" : "Prestation02",
      });
      setEditMode("ND");
    } catch (error) {
      console.log(error);
    }
  };

  // === AFFICHAGE ===

  // 1) Choix du technicien si tech === "ND"
  if (tech === "ND") {
    return (
      <Box>
        {techList.map((technician) => (
          <Box key={technician.nom} className={styles.btn} mb={1}>
            <Button
              variant="contained"
              onClick={() => setTech(technician.nom)}
              fullWidth
            >
              {technician.nom}
            </Button>
          </Box>
        ))}
      </Box>
    );
  }

  // 2) Sinon, on a choisi un tech => on affiche les contrôles pour la durée
  return (
    <Container sx={{ textAlign: "center" }}>
      {/* Affichage du nom du technicien choisi */}
      <Box className={styles.btn} mb={2}>
        <Button
          variant="outlined"
          onClick={() => {
            setTech("ND");
            setRepairTime(0);
          }}
        >
          {tech}
        </Button>
      </Box>

      {/* Boutons +15 et +75 */}
      <Grid2 container spacing={2} justifyContent="center" mb={2}>
        <Grid2>
          <Button
            variant="contained"
            onClick={() => setRepairTime(repairTime + 15)}
            className={styles.btn}
          >
            +15
          </Button>
        </Grid2>
        <Grid2>
          <Button
            variant="contained"
            onClick={() => setRepairTime(repairTime + 75)}
            className={styles.btn}
          >
            +75
          </Button>
        </Grid2>
      </Grid2>

      {/* Zone de saisie de la durée libre */}
      <Grid2 container justifyContent="center" mb={2}>
        <Grid2 xs={6} sm={4} md={3}>
          <TextField
            label="Durée en unités"
            type="number"
            variant="outlined"
            color="warning"
            fullWidth
            value={repairTime}
            onChange={(e) => setRepairTime(Number(e.target.value))}
          />
        </Grid2>
      </Grid2>

      {/* Boutons Confirmer / Ajouter si repairTime !== 0 */}
      {repairTime !== 0 && (
        <Grid2 container spacing={2} justifyContent="center">
          <Grid2>
            <Button
              variant="contained"
              onClick={() => handleSubmit("Confirmer")}
              className={styles.btn}
            >
              Confirmer
            </Button>
          </Grid2>
          <Grid2>
            <Button
              variant="contained"
              onClick={() => handleSubmit("Ajouter")}
              className={styles.btn}
            >
              Ajouter
            </Button>
          </Grid2>
        </Grid2>
      )}
    </Container>
  );
}
