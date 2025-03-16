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
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  TextField,
} from "@mui/material";

/**
 *
 * CarCardCrvEditMode
 *
 * - Permet d'éditer un véhicule en mode "Conseiller de Service" (CRDV).
 * - On y choisit le conseiller (csSelected),
 *   les travaux (requestSelected), et l’heure de RDV (rdvTime).
 * - On met ensuite à jour le doc dans Firestore (step: "Reception02").
 *
 */
export default function CarCardCrvEditMode({
  editMode,
  setOption,
  userIn,
  setEditMode,
}) {
  const car = editMode;
  const userName = userIn.userName;

  const [csSelected, setCsSelected] = useState(car.csSelected);
  const [rdvTime, setRdvTime] = useState("");
  const [requestSelected, setRequestSelected] = useState([]);
  const [requestConfirmed, setRequestConfirmed] = useState(false);

  const workingDate = new Date().toISOString().substring(0, 10);
  const carId = car.id;

  // On va stocker un équivalent "dataRequestArray"
  // qui convertit les valeurs "exp", "mec", "dia", "dev"
  // en un tableau d'objets, si besoin
  const [dataRequestArray, setDataRequestArray] = useState([]);

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

  // Met à jour le doc Firestore
  const handleSubmit = async (carId, cs, requestArr, time) => {
    try {
      await setDoc(
        doc(db, "parkingChronos", carId),
        {
          step: "Reception02",
          rdvTime: time,
          waitingAlerte: false,
          csSelected: cs,
          requestSelected: requestArr,
          // carStory, etc. si besoin
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
      {/* Carte principale affichant l'image et quelques infos */}
      <Grid2 xs={12} md={6}>
        <Card sx={{ width: 200, mx: "auto" }}>
          {/* Positionnement du Badge par-dessus l'image */}
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

      {/* Bloc : Sélection du conseiller (csSelected) */}
      <Grid2 xs={12} sx={{ mt: 2, textAlign: "center" }}>
        <Button
          variant="outlined"
          sx={{ width: 200 }}
          onClick={() => setCsSelected(csSelected === "ND" ? "ND" : "ND")}
        >
          {csSelected !== "ND" ? csSelected : "Choisir"}
        </Button>

        {/* On affiche la liste de radio si csSelected === "ND" */}
        {csSelected === "ND" && (
          <Box sx={{ mt: 2 }}>
            <FormControl>
              <FormLabel>Conseillers de service</FormLabel>
              <RadioGroup
                value={csSelected}
                onChange={(e) => setCsSelected(e.target.value)}
              >
                <FormControlLabel
                  value="AZIZ"
                  control={<Radio />}
                  label="AZIZ"
                />
                <FormControlLabel
                  value="ABDEL"
                  control={<Radio />}
                  label="ABDEL"
                />
                <FormControlLabel
                  value="BADR"
                  control={<Radio />}
                  label="BADR"
                />
                <FormControlLabel
                  value="SIMO"
                  control={<Radio />}
                  label="SIMO"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        )}
      </Grid2>

      {/* Sélection des travaux */}
      <Grid2 xs={12} sx={{ mt: 2, textAlign: "center" }}>
        {requestConfirmed ? (
          <Button
            variant="outlined"
            sx={{ width: 200 }}
            onClick={() => setRequestConfirmed(false)}
          >
            Travaux : {requestSelected.join(", ")}
          </Button>
        ) : (
          <Box>
            <Typography color="primary">Choisir travaux :</Typography>
            <FormGroup row sx={{ justifyContent: "center", mt: 1 }}>
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
              sx={{ mt: 2 }}
            >
              Confirmer
            </Button>
          </Box>
        )}
      </Grid2>

      {/* Saisie de l'heure du RDV */}
      <Grid2 xs={12} sx={{ mt: 2, textAlign: "center" }}>
        <TextField
          label="Heure RDV"
          type="time"
          value={rdvTime}
          onChange={(e) => setRdvTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid2>

      {/* Bouton Envoyer ou Annuler */}
      <Grid2 xs={12} sx={{ mt: 2, textAlign: "center" }}>
        {requestConfirmed && csSelected !== "ND" && rdvTime !== "" ? (
          <Button
            variant="contained"
            onClick={() =>
              handleSubmit(carId, csSelected, dataRequestArray, rdvTime)
            }
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
