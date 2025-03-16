"use client";
import React, { useState, useEffect } from "react";
import { db, storage } from "@/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Import MUI
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Badge,
  Typography,
  Stack,
} from "@mui/material";

export default function CeCarCard({ car, setEditMode }) {
  // Détermine la couleur du badge en fonction de car.waitingAlerte
  const availabilityColor = () => {
    switch (car.waitingAlerte) {
      case false:
        return "success"; // "Encours"
      case true:
        return "error"; // "Waiting"
      default:
        return "warning";
    }
  };

  const [carImage, setCarImage] = useState("");
  const spaceRef = ref(storage, `parkingChronos/${car.id}`);

  useEffect(() => {
    getDownloadURL(spaceRef)
      .then((url) => setCarImage(url))
      .catch((err) => console.log(err));
  }, [spaceRef]);

  // Gère la logique du clic sur la carte
  const handleCardClick = () => {
    setEditMode(car);
  };

  return (
    <Card sx={{ cursor: "pointer" }} onClick={handleCardClick}>
      {/* Si car.step === "Reception02", on affiche un "header" */}
      {car.step === "Reception02" && (
        <CardContent sx={{ pb: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Typography fontWeight="bold">{car.csSelected}</Typography>
            <Typography variant="body2" color="text.secondary">
              RDV : {car.rdvTime}
            </Typography>
          </Stack>
        </CardContent>
      )}

      <Badge
        variant="dot"
        color={availabilityColor()} // success, error, warning
        overlap="circular"
        badgeContent=""
        // On peut personnaliser la position via anchorOrigin ou sx
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{
          // Exemple de repositionnement (similaire aux offsets de NextUI)
          // "& .MuiBadge-badge": { top: 10, left: 10 }
        }}
      >
        <CardMedia
          component="img"
          image={carImage || ""}
          alt="loading.."
          sx={{
            width: "100%",
            height: 140,
            objectFit: "cover",
          }}
        />
      </Badge>

      {/* Footer */}
      <CardContent sx={{ pt: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            fontWeight="bold"
            // Si car.rdv === "RDV", on l'affiche en vert
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
