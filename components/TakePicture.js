'use client';
import React, { useEffect, useState } from "react";
import styles from "../styles/Button.module.css";
import { useRef } from "react";
import { db, storage, auth } from "../firebase";
import {
  ref,
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
import {
  Button,
  Image,
  Text,
  Card,
  Container,
  Grid,
  Input,
  Radio,
  Loading,
  Spacer,
  Badge,
  Avatar,
} from "@nextui-org/react";

export default function TakePicture({ setOption, brand, rdv, csSelected }) {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [laboZone, setLaboZone] = useState(true);
  const [image, setImage] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const [basy, setBasy] = useState(false);

  const inputRef = useRef(null);
  const [confirm, setConfirnm] = useState(0);

  const [loading, setLoading] = useState(0);

  const userName = auth.currentUser ? auth.currentUser.displayName : "Unknown";

  const submitMyCarPhoto = async (photo, photoId) => {
    try {
      const storageRef = ref(storage, `parkingChronos/${photoId}`);

      // Upload the photo to the storage reference
      await uploadString(storageRef, photo, "data_url");

      // Get the download URL of the uploaded photo
      const url = await getDownloadURL(storageRef);

      // Update the Firestore document with the image URL
      await setDoc(
        doc(db, "parkingChronos", photoId),
        { imageUrl: url },
        { merge: true }
      );

      // Close the photo here or do something else
      closePhoto();
      setOption("ND");
    } catch (error) {
      console.log(error);
      // handle the error here
    }
  };

  const getVideo = async () => {
    const constraints = {
      audio: false,
      video: {
        facingMode: "environment",
      },
    };

    if (videoRef.current && !videoRef.current.srcObject) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = videoRef.current;

        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
          video.play();
          setPlayingVideo(true);
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const emptyInput = () => {
    let myInput = inputRef.current;
    myInput.value = null;
  };

  // STOP CAMERA

  const stopStreamedVideo = (video) => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      setPlayingVideo(false);
    }
  };

  const takePhoto = () => {
    if (photoRef.current && playingVideo) {
      const width = 250;
      const height = 480;
      let photo = photoRef.current;
      let video = videoRef.current;
      photo.width = width;
      photo.height = height;

      let ctx = photo.getContext("2d");
      ctx.drawImage(video, 0, 0, photo.width, photo.height);

      const imageCaptured = photo.toDataURL("image/jpeg", 0.2);

      setImage(imageCaptured);

      emptyInput;
      setHasPhoto(true);
      stopStreamedVideo(video);
    }
  };

  const closePhoto = () => {
    let photo = photoRef.current;

    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);

    setHasPhoto(false);

    setLoading(0);
  };
  useEffect(() => {
    if (laboZone) {
      getVideo();
    }
  }, [videoRef, laboZone]);

  const [carStatus, setCarStatus] = useState("none");
  const takePictureSwitch = hasPhoto ? "flex" : "none";

  const carsCollectionRef = collection(db, "parkingChronos");

  const freePlace = async (car) => {
    try {
      const carRef = doc(db, "parkingChronos", `${car.id}`);
      // Create a reference to the file to delete
      const imageCarRef = ref(storage, `parkingChronos/${car.id}`);

      await updateDoc(carRef, {
        createdAt: deleteField(),
        place: deleteField(),
        basy: deleteField(),
        csSelected: deleteField(),
        note: deleteField(),
        placeStatus: deleteField(),
        lavage: deleteField(),
        carStory: deleteField(),
        imageUrl: deleteField(),
        id: deleteField(),
      });
      await deleteDoc(carRef);

      // Delete the file
      await deleteObject(imageCarRef);
      console.log("File deleted successfully");

      setLaboZone(false);

      setLoading(0);
    } catch (error) {
      console.log(error);
    }
  };

  const workingDate = new Date().toISOString().substring(0, 10);

  const handleSubmit = async (image, rdv, brand, csSelected) => {
    try {
      const docRef = await addDoc(carsCollectionRef, {
        // createdAt: serverTimestamp(),

        arrivedAt: new Date().toISOString().substring(11, 16),
        brand: brand,
        date: workingDate,
        step: "Reception01",
        rdv: rdv,
        waitingAlerte: true,
        csSelected: csSelected,

        carStory: [
          {
            qui: userName,
            quoi: "arrivedTime",
            date: workingDate,
            time: new Date().toISOString().substring(11, 16),
          },
        ],
      });

      await submitMyCarPhoto(image, docRef.id);

      await setDoc(
        doc(db, "parkingChronos", docRef.id),
        {
          id: docRef.id,
        },
        {
          merge: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid.Container justify="center">
      <Card
        css={{
          display: `${hasPhoto ? "flex" : "none"}`,
          width: "80vw",
          maxWidth: "600px",
          backgroundColor: "transparent",
        }}
      >
        <Card.Body>
          <Grid.Container justify="center">
            <Grid justify="center">
              <canvas
                style={{
                  display: `${takePictureSwitch}`,
                  // margin: "auto",
                  width: "30vw",
                  height: "30vh",
                  minWidth: "190px",
                }}
                ref={photoRef}
              />
            </Grid>
          </Grid.Container>
        </Card.Body>
        <Card.Footer>
          <Grid.Container gap={1} justify="space-evenly">
            
              <div className={styles.btn}>
                <a
                  href="#"
                  onClick={() => {
                    closePhoto();
                    setOption("ND");
                  }}
                >
                  Annuler
                </a>
              </div>
              <div className={styles.btn}>
                <a
                  href="#"
                  onClick={() => handleSubmit(image, rdv, brand, csSelected)}
                >
                  Enregistrer
                </a>
              </div>
           
          </Grid.Container>
        </Card.Footer>
      </Card>

      <div
        id="laboZone"
        style={{
          display: "flex",
          borderRadius: "20%",
          display: `${hasPhoto ? "none" : "flex"}`,
        }}
      >
        <div
          onClick={() => takePhoto()}
          style={{
            position: "relative",
            padding: "10% 10% 20% 15%",
            height: "70vw",
            width: "70vw",
          }}
        >
          <video
            ref={videoRef}
            style={{
              borderRadius: "20%",
              width: "100%",
              height: "100%",
              objectFit: "fill",
            }}
          />
        </div>
      </div>
    </Grid.Container>
  );
}
