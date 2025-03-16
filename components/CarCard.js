"use client";
import React, { useState, useEffect } from "react";
import { db, storage } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Composants MUI
import {
  Badge,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

export default function CarCard({ car, setEditMode }) {
  // Détermine la couleur du badge selon l’état d’alerte
  const getAvailabilityColor = () => {
    switch (car.waitingAlerte) {
      case false:
        // "Encours"
        return "success";
      case true:
        // "Waiting"
        return "error";
      default:
        return "warning";
    }
  };

  // Charge l’image depuis Firebase Storage
  const [carImage, setCarImage] = useState("");
  const spaceRef = ref(storage, `parkingChronos/${car.id}`);

  useEffect(() => {
    getDownloadURL(spaceRef)
      .then((url) => setCarImage(url))
      .catch((err) => console.log(err));
  }, [spaceRef]);

  return (
    <Card
      sx={{ cursor: "pointer" }}
      onClick={() => setEditMode(car)}
      
    >
      {/* Entête conditionnelle : affichée uniquement si step === "Reception02" */}
      {car.step === "Reception02" && (
        <CardContent sx={{ pb: 0 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontWeight="bold">{car.csSelected}</Typography>
            <Typography variant="body2" color="text.secondary">
              RDV : {car.rdvTime}
            </Typography>
          </Stack>
        </CardContent>
      )}

      <Badge
        overlap="circular"
        variant="dot"
        badgeContent="" // on reste sur un point
        color={getAvailabilityColor()} // success, error, warning
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{
          // Exemple si tu veux ajuster la position du badge :
          // "& .MuiBadge-badge": { top: "5%", left: "45%" },
        }}
      >
        <CardMedia
          component="img"
          image={carImage}
          alt="loading.."
          sx={{
            height: 140,
            objectFit: "cover",
          }}
        />
      </Badge>

      {/* Footer */}
      <CardContent sx={{ pt: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {/* Si car.rdv === "RDV", on affiche en vert */}
          <Typography
            fontWeight="bold"
            color={car.rdv === "RDV" ? "success.main" : "inherit"}
          >
            {car.rdv}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight="600">
            Arrivée : {car.arrivedAt}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
