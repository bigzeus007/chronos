"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Button.module.css";

// Firebase imports
import {
  ref as storageRef,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  getDoc,
  updateDoc,
  doc,
  addDoc,
  onSnapshot,
  setDoc,
  serverTimestamp,
  collection,
  deleteField,
  deleteDoc,
} from "firebase/firestore";
import { db, storage, auth } from "../firebase";

// Import MUI
import {
  Box,
  Grid2,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

export default function TakePicture({ setOption, brand, rdv, csSelected }) {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const userName = auth.currentUser ? auth.currentUser.displayName : "Unknown";

  // === INITIALISATION FIRESTORE ===
  const carsCollectionRef = collection(db, "parkingChronos");
  const workingDate = new Date().toISOString().substring(0, 10);

  // === Gestion de la caméra ===
  const getVideo = async () => {
    const constraints = {
      audio: false,
      video: {
        facingMode: "environment",
      },
    };

    // Si on n'a pas déjà de flux vidéo en cours
    if (videoRef.current && !videoRef.current.srcObject) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current.play();
          setPlayingVideo(true);
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Arrêter la caméra
  const stopStreamedVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      setPlayingVideo(false);
    }
  };

  // Capture la photo depuis le flux vidéo
  const takePhoto = () => {
    if (photoRef.current && playingVideo) {
      const width = 250;
      const height = 480;
      let photoCanvas = photoRef.current;
      let video = videoRef.current;

      photoCanvas.width = width;
      photoCanvas.height = height;

      let ctx = photoCanvas.getContext("2d");
      ctx.drawImage(video, 0, 0, width, height);

      const imageCaptured = photoCanvas.toDataURL("image/jpeg", 0.2);
      setImage(imageCaptured);
      setHasPhoto(true);

      // On arrête la caméra après la capture
      stopStreamedVideo();
    }
  };

  // Nettoyage de la photo capturée
  const closePhoto = () => {
    let ctx = photoRef.current.getContext("2d");
    ctx.clearRect(0, 0, photoRef.current.width, photoRef.current.height);

    setHasPhoto(false);
    setLoading(false);
  };

  // On lance la caméra au chargement du composant
  useEffect(() => {
    getVideo();
    // Cleanup : si le composant se démonte, on arrête la caméra
    return () => {
      stopStreamedVideo();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // === Fonction d'upload / enregistrement Firestore + Storage ===
  const submitMyCarPhoto = async (photo, photoId) => {
    try {
      // Upload la photo dans Firebase Storage
      const sRef = storageRef(storage, `parkingChronos/${photoId}`);
      await uploadString(sRef, photo, "data_url");

      // Récupère l'URL de la photo
      const url = await getDownloadURL(sRef);

      // Met à jour le doc Firestore avec l'URL
      await setDoc(
        doc(db, "parkingChronos", photoId),
        { imageUrl: url },
        { merge: true }
      );

      // Fermeture de la photo et retour
      closePhoto();
      setOption("ND");
    } catch (error) {
      console.log(error);
    }
  };

  // Ajout d'un nouveau doc en Firestore, puis upload de la photo
  const handleSubmit = async (imageCaptured, rdvValue, brandValue, cs) => {
    setLoading(true);
    try {
      // Création du doc
      const docRef = await addDoc(carsCollectionRef, {
        arrivedAt: new Date().toISOString().substring(11, 16),
        brand: brandValue,
        date: workingDate,
        step: "Reception01",
        rdv: rdvValue,
        waitingAlerte: true,
        csSelected: cs,
        carStory: [
          {
            qui: userName,
            quoi: "arrivedTime",
            date: workingDate,
            time: new Date().toISOString().substring(11, 16),
          },
        ],
      });

      // Upload de la photo
      await submitMyCarPhoto(imageCaptured, docRef.id);

      // Mise à jour du doc avec son ID
      await setDoc(
        doc(db, "parkingChronos", docRef.id),
        { id: docRef.id },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // === Rendu JSX ===
  return (
    <Grid2 container justifyContent="center" sx={{ p: 2 }}>
      {/* Card qui affiche l'aperçu de la photo si hasPhoto = true */}
      <Card
        variant="outlined"
        sx={{
          display: hasPhoto ? "flex" : "none",
          width: "80vw",
          maxWidth: 600,
          backgroundColor: "transparent",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <CardContent>
          <Grid2 container justifyContent="center">
            <Grid2>
              <canvas
                ref={photoRef}
                style={{
                  display: hasPhoto ? "block" : "none",
                  width: "30vw",
                  height: "30vh",
                  minWidth: "190px",
                }}
              />
            </Grid2>
          </Grid2>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-evenly", width: "100%" }}>
          <Button
            variant="outlined"
            onClick={() => {
              closePhoto();
              setOption("ND");
            }}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={() => handleSubmit(image, rdv, brand, csSelected)}
            disabled={loading}
            sx={{ ml: 2 }}
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </CardActions>
      </Card>

      {/* Zone de capture (vidéo) si la photo n'est pas prise */}
      <Box
        id="laboZone"
        sx={{
          display: hasPhoto ? "none" : "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={takePhoto}
      >
        <video
          ref={videoRef}
          style={{
            borderRadius: "20px",
            width: "70vw",
            maxWidth: "400px",
            height: "auto",
            objectFit: "cover",
          }}
        />
        <Typography
          variant="body2"
          color="white"
          sx={{ mt: 1, textAlign: "center" }}
        >
          Touchez l’écran pour prendre la photo
        </Typography>
      </Box>
    </Grid2>
  );
}
