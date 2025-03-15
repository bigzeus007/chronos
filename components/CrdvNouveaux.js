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
import CarCardCrvEditMode from "./profiles/carCardEditMode/CarCardCrvEditMode";

export default function CrdvNouveaux({setOption,cars,userIn }){

  const [editMode, setEditMode]=useState("ND")
  

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


  return editMode==="ND"?(<Container justify="center">
    <Grid.Container gap={0.5} >
      <Grid xs={24} justify="center">
      <Text size="$md" color="white">Liste des véhicules non traités</Text>
      </Grid>
      <Grid.Container gap={2} justify="flex-start">
      {cars.map((car)=><Grid xs={6} sm={3} key={car.id}>
        <CarCard car={car} setEditMode={setEditMode}></CarCard>
      </Grid>)}
      </Grid.Container>
    </Grid.Container>
   <Grid.Container justify="center">
    <div className={styles.btn}>
        <a href="#" onClick={() => setOption("ND")}>
        RETOUR
        </a>
      </div>
      </Grid.Container>

  </Container>):(<CarCardCrvEditMode editMode={editMode} setOption={setOption} userIn={userIn} setEditMode={setEditMode} ></CarCardCrvEditMode>);
};
