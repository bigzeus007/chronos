import React, { useEffect, useState } from "react";
import styles from "../styles/Button.module.css";
import {
  Grid,
  Container,
  Image,
  Card,
  Spacer,
  Text,
  Row,
  Col,
  Button,
  Badge,
  Avatar,
} from "@nextui-org/react";
import "firebase/firestore";
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
import CarCard from "./CarCard";

export default function PisteurParc({setOption}){
  

  function csBadgeColor(key) {
    let csCovert = "";
    switch (key) {
      case "AZIZ":
        csCovert = "purple";
        break;
      case "ABDEL":
        csCovert = "green";
        break;
      case "BADR":
        csCovert = "orange";
        break;
      case "SIMO":
        csCovert = "blue";
        break;
      case "ND":
        csCovert = "red";
        break;

      default:
        csCovert = "gray";
        break;
    }
    return csCovert;
  }

  const emptyPlace = {
    csSelected: "ND",
    rdv: "ND",
    lavage: "ND",
    note: "",
    date: "",
    imageUrl: "https://via.placeholder.com/320x180",
  };

  const [cars, setCars] = useState([]);
  const [carsWaiting, setCarsWaiting] = useState([]);

  const parcListRef = collection(db, "parkingChronos");
  useEffect(() => {
    const queryCarsTimeless = query(parcListRef, where("step", "==", "Reception01"));
    const unsubscribe = onSnapshot(queryCarsTimeless, (querySnapshot) => {
      const carsData = [];

      querySnapshot.forEach((doc) => {
        carsData.push(doc.data());
      });
      setCars(carsData);
    });

    return unsubscribe; // cleanup function
  }, []);
  useEffect(() => {
    const queryCarsWaiting = query(parcListRef, where("step", "==", "Reception02"));
    const unsubscribe = onSnapshot(queryCarsWaiting, (querySnapshot) => {
      const carsDataWaiting = [];

      querySnapshot.forEach((doc) => {
        carsDataWaiting.push(doc.data());
      });
      setCarsWaiting(carsDataWaiting);
    });

    return unsubscribe; // cleanup function
  }, [parcListRef]);
  console.log(cars,carsWaiting)

  return (<Container justify="center">
    <Grid.Container gap={0.5} >
      <Grid xs={24} justify="center">
      <Text size="$md" color="white">Liste des vehicules non affectés</Text>
      </Grid>
      {cars.map((car)=><Grid key={car.id} >
        <CarCard car={car}></CarCard>
      </Grid>)}
    </Grid.Container>
    <Grid.Container>
    <Grid xs={24} justify="center">
      {carsWaiting.length!==0&&<Text size="$md" color="white">Liste des vehicules affectés</Text>}
      </Grid>
      {carsWaiting.map((car)=><Grid key={car.id} >
        <CarCard car={car}></CarCard>
      </Grid>)}
    </Grid.Container>
   <Grid.Container justify="center">
    <div className={styles.btn}>
        <a href="#" onClick={() => setOption("ND")}>
        RETOUR
        </a>
      </div>
      </Grid.Container>

  </Container>);
};
