"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/Button.module.css";
import { db, storage } from "../firebase";
import {
  collection,
  getDocs,
  orderBy,
  onSnapshot,
  doc,
  query,
  where,
} from "firebase/firestore";

// Composants MUI
import {
  Box,
  Container,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

import DptChoiceSAD from "./DptChoiceSAD";
import CarCardSAD from "./CarCardSAD";

export default function ModifierParc({ setOption, cars }) {
  const [editMode, setEditMode] = useState("ND");

  // === Affichage du "mode liste" ===
  if (editMode === "ND") {
    return (
      <Container>
        <Grid2 container spacing={0.5} justifyContent="center">
          <Grid2 xs={12}>
            <Typography variant="h6" color="white">
              Liste des véhicules
            </Typography>
          </Grid2>

          <Grid2
            container
            spacing={2}
            justifyContent="flex-start"
            sx={{ mt: 1 }}
          >
            {/* Carte permettant d’ajouter un nouveau véhicule au parc */}
            <Grid2 xs={6} sm={6} md={4} lg={3} xl={3}>
              <Card
                sx={{ cursor: "pointer" }}
                onClick={() => setEditMode("Empty")}
              >
                <CardMedia
                  component="img"
                  image="../public/AddSADCars.jpg"
                  alt="Ajouter"
                  sx={{ height: 140, objectFit: "cover" }}
                />
              </Card>
            </Grid2>

            {/* Liste des véhicules existants dans la BDD */}
            {cars &&
              cars.map((car) => (
                <Grid2 xs={6} sm={6} md={4} lg={3} xl={3} key={car.id}>
                  <Card>
                    <CardContent sx={{ pb: 0 }}>
                      <Typography>{car.dpt}</Typography>
                      <Typography>{car.brand}</Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      image={car.photoUrl}
                      alt={car.model}
                      sx={{ height: 140, objectFit: "cover" }}
                    />
                    <CardContent sx={{ pt: 1 }}>
                      <Typography>{car.model}</Typography>
                      <Typography>{car.km} Km</Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
          </Grid2>

          {/* Bouton RETOUR */}
          <Grid2 container justifyContent="center" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => setOption("ND")}
              className={styles.btn}
            >
              RETOUR
            </Button>
          </Grid2>
        </Grid2>
      </Container>
    );
  }

  // === Affichage du "mode Empty" => Choix du Département SAD ===
  if (editMode === "Empty") {
    return (
      <DptChoiceSAD
        editMode={editMode}
        setOption={setOption}
        setEditMode={setEditMode}
      />
    );
  }

  // === Sinon, affichage d'une "CarCardSAD" en mode édition ===
  return (
    <CarCardSAD
      editMode={editMode}
      setOption={setOption}
      setEditMode={setEditMode}
    />
  );
}
