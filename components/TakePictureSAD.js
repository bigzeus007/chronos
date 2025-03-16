"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Button.module.css";

// Firebase
import {
  ref as storageRef,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  deleteField,
  collection,
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

export default function TakePictureSAD({ setOption, brand, rdv, csSelected }) {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const userName = auth.currentUser ? auth.currentUser.displayName : "Unknown";

  const carsCollectionRef = collection(db, "parkingChronos");
  const workingDate = new Date().toISOString().substring(0, 10);

  // === Lancement de la caméra ===
  const getVideo = async () => {
    const constraints = {
      audio: false,
      video: { facingMode: "environment" },
    };

    if (videoRef.current && !videoRef.current.srcObject) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current.play();
          setPlayingVideo(true);
        });
      } catch (err) {
        console.error("Erreur caméra:", err);
      }
    }
  };

  // Stopper la caméra
  const stopStreamedVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      setPlayingVideo(false);
    }
  };

  // === Prendre la photo ===
  const takePhoto = () => {
    if (photoRef.current && playingVideo) {
      const width = 250;
      const height = 480;
      const photoCanvas = photoRef.current;
      const video = videoRef.current;

      photoCanvas.width = width;
      photoCanvas.height = height;

      const ctx = photoCanvas.getContext("2d");
      ctx.drawImage(video, 0, 0, width, height);

      const imageCaptured = photoCanvas.toDataURL("image/jpeg", 0.2);
      setImage(imageCaptured);
      setHasPhoto(true);

      // On arrête la caméra après la capture
      stopStreamedVideo();
    }
  };

  // Réinitialiser la photo
  const closePhoto = () => {
    const ctx = photoRef.current.getContext("2d");
    ctx.clearRect(0, 0, photoRef.current.width, photoRef.current.height);

    setHasPhoto(false);
    setLoading(false);
  };

  // === Upload photo et mise à jour Firestore ===
  const submitMyCarPhoto = async (base64Photo, docId) => {
    try {
      // On stocke l'image dans Firebase Storage
      const sRef = storageRef(storage, `parkingSAD/${docId}`);
      await uploadString(sRef, base64Photo, "data_url");

      const url = await getDownloadURL(sRef);
      // On met à jour la doc Firestore avec l'URL
      await setDoc(
        doc(db, "parkingChronos", docId),
        { imageUrl: url },
        { merge: true }
      );

      // On referme la preview et on revient en arrière
      closePhoto();
      setOption("ND");
    } catch (error) {
      console.error("Erreur d'upload:", error);
    }
  };

  // === Création du doc Firestore + upload de la photo ===
  const handleSubmit = async (base64Photo, brandValue, rdvValue, csValue) => {
    setLoading(true);
    try {
      // On crée un doc en Firestore
      const docRef = await addDoc(carsCollectionRef, {
        createdAt: new Date().toISOString().substring(11, 16),
        brand: brandValue,
        date: workingDate,
        step: "Reception01",
        rdv: rdvValue || "ND",
        csSelected: csValue || "ND",
        carStory: [
          {
            qui: userName,
            quoi: "arrivedTime",
            date: workingDate,
            time: new Date().toISOString().substring(11, 16),
          },
        ],
      });

      // Ensuite on uploade la photo
      await submitMyCarPhoto(base64Photo, docRef.id);

      // Enfin on met à jour le doc avec son propre ID
      await setDoc(
        doc(db, "parkingChronos", docRef.id),
        { id: docRef.id },
        { merge: true }
      );
    } catch (error) {
      console.error("Erreur Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

  // Au montage, on lance la caméra
  useEffect(() => {
    getVideo();
    return () => stopStreamedVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid2 container justifyContent="center" sx={{ p: 2 }}>
      {/* Carte de prévisualisation si photo capturée */}
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
            onClick={() => handleSubmit(image, brand, rdv, csSelected)}
            disabled={loading}
            sx={{ ml: 2 }}
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </CardActions>
      </Card>

      {/* Zone d'affichage de la caméra si on n'a pas pris de photo */}
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
