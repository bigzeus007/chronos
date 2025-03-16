"use client";
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { db, storage } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Import MUI
import {
  Grid2,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Box,
} from "@mui/material";

export default function CarCardSAD({ editMode, setOption, setEditMode }) {
  const initialCar = {
    dpt: editMode.dpt,
    brand: editMode.brand,
    photoUrl: "../public/AddSADCars.jpg",
    km: 0,
    model: "",
    carburant: 0,
    imm: "Immatriculation",
  };

  const carEdited = editMode;

  // Image par défaut si jamais on ne la récupère pas dans Firebase
  const [carImage, setCarImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/terminal00.appspot.com/o/parkingSAD%2FAddSADCars.jpg?alt=media&token=e135e3e1-41f9-4064-8f9f-f5f611b37067"
  );

  // Référence pour charger la photo depuis Firebase
  const spaceRef = ref(storage, `parkingSAD/${carEdited.id}`);

  useEffect(() => {
    getDownloadURL(spaceRef)
      .then((url) => setCarImage(url))
      .catch((err) => console.log(err));
  }, [spaceRef]);

  // État pour la gestion de la photo (optionnel)
  const [editPic, setEditPic] = useState("askToEdit");

  // Fonction de prise de photo via la caméra
  const EditPhoto = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then(function (stream) {
        // On crée un <video>, on dessine l’image sur un <canvas> ensuite
        const video = document.createElement("video");
        video.srcObject = stream;
        video.onloadedmetadata = function () {
          video.play();
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext("2d");
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          // Exemple: setCarImage(canvas.toDataURL("image/png"));

          // On arrête le flux de la caméra
          stream.getTracks().forEach((track) => track.stop());
        };
      })
      .catch(function (error) {
        console.error("Error accessing camera:", error);
      });
  };

  return (
    <Grid2 container justifyContent="center">
      {/* On limite la carte à une largeur sm/md */}
      <Grid2 xs={12} sm={6} md={6} lg={6} xl={6}>
        <Card>
          {/* Équivalent du Card.Header avec MUI : CardContent + Stack */}
          <CardContent sx={{ pb: 1 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              {/* Bloc gauche (dpt, brand) */}
              <Stack>
                <Typography>{carEdited.dpt}</Typography>
                <Typography>{carEdited.brand}</Typography>
              </Stack>

              {/* Bloc droit (model, imm) */}
              <Stack>
                <Typography>{carEdited.model}</Typography>
                <Typography>{carEdited.imm}</Typography>
              </Stack>
            </Stack>
          </CardContent>

          {/* Équivalent du Card.Body (image) */}
          <CardMedia
            component="img"
            image={carImage}
            alt="Default Image"
            onClick={() => EditPhoto(editPic)}
            sx={{
              // Dimensions similaires à ce que tu avais avant
              width: "100%",
              height: 300,
              objectFit: "fill",
              cursor: "pointer",
            }}
          />

          {/* Équivalent du Card.Footer */}
          <CardContent sx={{ pt: 1 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              <Typography>{carEdited.carburant}</Typography>
              <Typography>{carEdited.imm}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}
