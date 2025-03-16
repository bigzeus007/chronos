"use client";
import React, { useState } from "react";
import styles from "../../../styles/Button.module.css";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

// Import MUI
import {
  Box,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Badge,
  Button,
} from "@mui/material";

import AteliersChoice from "@/components/AteliersChoice"; // Assurez-vous que AteliersChoice est lui aussi migré en MUI

export default function CarCardCeEditMode({
  editMode,
  setOption,
  userIn,
  setEditMode,
}) {
  const car = editMode;
  const userName = userIn.userName;

  const [atelier, setAtelier] = useState("ND");
  const [affectationStep, setAffectationStep] = useState(0);

  const workingDate = new Date().toISOString().substring(0, 10);
  const carId = car.id;

  // Récupère la couleur du badge selon l’état waitingAlerte
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

  // Exemple de fonction de soumission Firestore
  const handleSubmit = async (carId, requestSelected, rdvTime) => {
    try {
      await setDoc(
        doc(db, "parkingChronos", carId),
        {
          step: "Prestation01",
          restitutionTime: rdvTime,
          waitingAlerte: true,
          requestSelected: requestSelected,
          // carStory: [
          //   ...car.carStory,
          //   {
          //     qui: userName,
          //     quoi: "traitement crdv",
          //     date: workingDate,
          //     time: new Date().toISOString().substring(11, 16),
          //   },
          // ],
        },
        { merge: true }
      );
      setOption("ND");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid2 container justifyContent="center" sx={{ p: 2 }}>
      {/* Carte d’affichage du véhicule */}
      <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
        <Card sx={{ width: 200, mx: "auto" }}>
          <Box sx={{ position: "relative" }}>
            <Badge
              color={availabilityColor().color}
              variant="dot"
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
                sx={{
                  width: 200,
                  height: 140,
                  objectFit: "cover",
                }}
              />
            </Badge>
          </Box>

          <CardContent sx={{ pb: 1 }}>
            <Grid2 container justifyContent="space-between" alignItems="center">
              <Grid2>
                <Typography variant="body2" fontWeight="bold">
                  {car.rdv}
                </Typography>
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
          </CardContent>
        </Card>
      </Grid2>

      {/* Choix d’atelier si affectationStep = 0 */}
      <Grid2 xs={12}>
        {affectationStep === 0 && (
          <AteliersChoice
            atelier={atelier}
            setAtelier={setAtelier}
            editMode={editMode}
            setOption={setOption}
            userIn={userIn}
            setEditMode={setEditMode}
          />
        )}
      </Grid2>

      {/* Bouton Annuler */}
      <Grid2 xs={12} sx={{ mt: 2 }}>
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
