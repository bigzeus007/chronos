"use client";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

// Import MUI
import { Container, Typography, Button } from "@mui/material";
import { Grid2 } from "@mui/material"; // ✅ Correction : utiliser Grid2

// Import du composant CarCard déjà migré vers MUI
import CarCard from "./CarCard";

export default function PisteurParc({ setOption }) {
  const [cars, setCars] = useState([]);
  const [carsWaiting, setCarsWaiting] = useState([]);

  const parcListRef = collection(db, "parkingChronos");

  useEffect(() => {
    const queryCars = query(
      parcListRef,
      where("step", "in", ["Reception01", "Reception02"])
    );

    const unsubscribe = onSnapshot(queryCars, (snapshot) => {
      const carsData = [];
      const carsWaitingData = [];

      snapshot.forEach((doc) => {
        const car = doc.data();
        if (car.step === "Reception01") {
          carsData.push(car);
        } else if (car.step === "Reception02") {
          carsWaitingData.push(car);
        }
      });

      setCars(carsData);
      setCarsWaiting(carsWaitingData);
    });

    return unsubscribe;
  }, []);

  return (
    <Container>
      <Grid2 container spacing={0.5} justifyContent="center">
        {/* Liste des véhicules non affectés */}
        <Grid2 xs={12}>
          <Typography variant="h6" color="white" sx={{ mb: 1 }}>
            Liste des véhicules non affectés
          </Typography>
        </Grid2>
        {cars.map((car) => (
          <Grid2 key={car.id} xs={12} sm={6} md={4} lg={3}>
            <CarCard car={car} />
          </Grid2>
        ))}
      </Grid2>

      <Grid2 container spacing={0.5} justifyContent="center" sx={{ mt: 2 }}>
        {/* Liste des véhicules affectés (Reception02) */}
        {carsWaiting.length !== 0 && (
          <Grid2 xs={12}>
            <Typography variant="h6" color="white" sx={{ mb: 1 }}>
              Liste des véhicules affectés
            </Typography>
          </Grid2>
        )}
        {carsWaiting.map((car) => (
          <Grid2 key={car.id} xs={12} sm={6} md={4} lg={3}>
            <CarCard car={car} />
          </Grid2>
        ))}
      </Grid2>

      {/* Bouton RETOUR */}
      <Grid2 container justifyContent="center" sx={{ mt: 2 }}>
        <Button variant="contained" onClick={() => setOption("ND")}>
          RETOUR
        </Button>
      </Grid2>
    </Container>
  );
}
