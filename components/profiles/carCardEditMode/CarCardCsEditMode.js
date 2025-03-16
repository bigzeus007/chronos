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
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";

export default function CarCardCsEditMode({
  editMode,
  setOption,
  userIn,
  setEditMode,
}) {
  const car = editMode;
  const userName = userIn.userName;

  const [rdvTime, setRdvTime] = useState("");
  const [requestSelected, setRequestSelected] = useState([]);
  const [requestConfirmed, setRequestConfirmed] = useState(false);
  const [dataRequestArray, setDataRequestArray] = useState([]);

  const workingDate = new Date().toISOString().substring(0, 10);
  const carId = car.id;

  // Convertit les valeurs ("exp", "mec", etc.) en tableaux d'objets
  const dataRequestConvert = (array) => {
    const dataRequestArrayInit = array.map((item) => {
      switch (item) {
        case "exp":
          return { exp: true };
        case "mec":
          return { mec: true };
        case "dia":
          return { dia: true };
        case "dev":
          return { dev: true };
        default:
          return {};
      }
    });
    setDataRequestArray(dataRequestArrayInit);
    return dataRequestArrayInit;
  };

  // Soumission : on met à jour le doc dans Firestore
  const handleSubmit = async (carId, reqArray, restitutionTime) => {
    try {
      await setDoc(
        doc(db, "parkingChronos", carId),
        {
          step: "Reception03",
          restitutionTime,
          waitingAlerte: true,
          requestSelected: reqArray,
        },
        { merge: true }
      );
      setOption("ND");
    } catch (error) {
      console.log(error);
    }
  };

  // Détermine la couleur du badge selon waitingAlerte
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
      {/* Carte affichant l'image du véhicule */}
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
                  Arrivee : {car.arrivedAt}
                </Typography>
              </Grid2>
            </Grid2>
          </CardContent>
        </Card>
      </Grid2>

      {/* Section : Choix des travaux */}
      <Grid2 xs={12} sx={{ mt: 2, textAlign: "center" }}>
        {requestConfirmed ? (
          <Button
            variant="outlined"
            onClick={() => setRequestConfirmed(false)}
            sx={{ width: 200 }}
          >
            Travaux : {requestSelected.join(", ")}
          </Button>
        ) : (
          <Box>
            <Typography color="primary" sx={{ mb: 1 }}>
              Choisir travaux :
            </Typography>
            <FormGroup row sx={{ justifyContent: "center", mb: 1 }}>
              {/* Chaque case à cocher */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={requestSelected.includes("exp")}
                    onChange={(e) => {
                      const val = "exp";
                      if (e.target.checked) {
                        setRequestSelected((prev) => [...prev, val]);
                      } else {
                        setRequestSelected((prev) =>
                          prev.filter((x) => x !== val)
                        );
                      }
                    }}
                  />
                }
                label="Express"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={requestSelected.includes("mec")}
                    onChange={(e) => {
                      const val = "mec";
                      if (e.target.checked) {
                        setRequestSelected((prev) => [...prev, val]);
                      } else {
                        setRequestSelected((prev) =>
                          prev.filter((x) => x !== val)
                        );
                      }
                    }}
                  />
                }
                label="Mécanique"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={requestSelected.includes("dia")}
                    onChange={(e) => {
                      const val = "dia";
                      if (e.target.checked) {
                        setRequestSelected((prev) => [...prev, val]);
                      } else {
                        setRequestSelected((prev) =>
                          prev.filter((x) => x !== val)
                        );
                      }
                    }}
                  />
                }
                label="Diag"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={requestSelected.includes("dev")}
                    onChange={(e) => {
                      const val = "dev";
                      if (e.target.checked) {
                        setRequestSelected((prev) => [...prev, val]);
                      } else {
                        setRequestSelected((prev) =>
                          prev.filter((x) => x !== val)
                        );
                      }
                    }}
                  />
                }
                label="Devis"
              />
            </FormGroup>
            <Button
              variant="contained"
              onClick={() => {
                setRequestConfirmed(true);
                dataRequestConvert(requestSelected);
              }}
              sx={{ width: 200 }}
            >
              Confirmer
            </Button>
          </Box>
        )}
      </Grid2>

      {/* Section : Saisie de l'heure de restitution */}
      <Grid2 xs={12} sx={{ mt: 2, textAlign: "center" }}>
        <TextField
          label="Réstitution"
          type="time"
          onChange={(e) => setRdvTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid2>

      {/* Boutons Envoyer / Annuler */}
      <Grid2 xs={12} sx={{ mt: 2, textAlign: "center" }}>
        {requestConfirmed && rdvTime !== "" ? (
          <Button
            variant="contained"
            onClick={() => handleSubmit(carId, dataRequestArray, rdvTime)}
            className={styles.btn}
          >
            Envoyer
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => setEditMode("ND")}
            className={styles.btn}
          >
            Annuler
          </Button>
        )}
      </Grid2>
    </Grid2>
  );
}
