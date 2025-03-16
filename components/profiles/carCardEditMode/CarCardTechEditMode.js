"use client";
import React, { useState } from "react";
import styles from "../../../styles/Button.module.css";
import { db } from "@/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

// Import MUI
import {
  Box,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Badge,
  Button,
} from "@mui/material";

export default function CarCardTechEditMode({
  editMode,
  setOption,
  userIn,
  setEditMode,
}) {
  const car = editMode;
  const userName = userIn.userName;

  // Exemple de fonction Firestore (si vous souhaitez l'utiliser)
  const handleSubmit = async (carId) => {
    try {
      await setDoc(
        doc(db, "parkingChronos", carId),
        {
          step: "Prestation01",
          waitingAlerte: true,
          // ...
        },
        { merge: true }
      );
      setOption("ND");
    } catch (error) {
      console.log(error);
    }
  };

  // Détermine la couleur du badge
  const availabilityColor = () => {
    switch (car.waitingAlerte) {
      case false:
        return { content: "Encours", color: "success" };
      case true:
        return { content: "Waiting", color: "error" };
      default:
        return { content: "", color: "warning" };
    }
  };

  return (
    <Grid2 container justifyContent="center" sx={{ p: 2 }}>
      {/* Bouton "Début" */}
      <Grid2 xs={12} sx={{ mb: 2, textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => setEditMode("ND")}
          className={styles.btn}
        >
          Début
        </Button>
      </Grid2>

      {/* Carte affichant les infos du véhicule */}
      <Grid2 xs={12} md={6}>
        <Card sx={{ width: 200, mx: "auto" }}>
          <Box sx={{ position: "relative" }}>
            <Badge
              variant="dot"
              color={availabilityColor().color}
              overlap="circular"
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
              }}
            >
              <CardMedia
                component="img"
                image={car.imageUrl}
                alt="loading.."
                sx={{ width: 200, height: 140, objectFit: "cover" }}
              />
            </Badge>
          </Box>

          <CardContent sx={{ pb: 1 }}>
            <Grid2 container justifyContent="space-between" alignItems="center">
              <Grid2>
                <Typography fontWeight="bold">{car.rdv}</Typography>
              </Grid2>
              <Grid2>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="600"
                >
                  Livraison : {car.restitutionTime}
                </Typography>
              </Grid2>
            </Grid2>

            <Grid2
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <Grid2>
                <Typography fontWeight="bold">{car.csSelected}</Typography>
              </Grid2>
              <Grid2>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="600"
                >
                  Durée : {car[userIn.nom]?.repairTime}
                </Typography>
              </Grid2>
            </Grid2>
          </CardContent>
        </Card>
      </Grid2>

      {/* Bouton Annuler */}
      <Grid2 xs={12} sx={{ mt: 2, textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => setEditMode("ND")}
          className={styles.btn}
        >
          Annuler
        </Button>
      </Grid2>
    </Grid2>
  );
}
