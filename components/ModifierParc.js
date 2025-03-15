'use client';
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
import CeCarCard from "./ceCarCard";
import CarCardCeEditMode from "./profiles/carCardEditMode/CarCardCeEditMode";
import CarCardSAD from "./CarCardSAD";
import DptChoiceSAD from "./DptChoiceSAD";

export default function ModifierParc({ setOption, cars }) {
  const [editMode, setEditMode] = useState("ND");

  return editMode === "ND" ? (
    <Container justify="center">
      <Grid.Container gap={0.5}>
        <Grid xs={24} justify="center">
          <Text size="$md" color="white">
            Liste des vehicules
          </Text>
        </Grid>
        <Grid.Container gap={2} justify="flex-start">
          {/* Pour Ajouter un nouveau vehicule au parc */}

          <Card
            key="new"
            xs={6}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            isPressable
            onPress={() => setEditMode("Empty")}
          >
            <Card.Body>
              <Card.Image
                src="../public/AddSADCars.jpg"
                objectFit="cover"
                width="100%"
                height={140}
                alt="Ajouter"
              />
            </Card.Body>
          </Card>
          {/* Liste des vehicules dans la BDD */}
          {cars &&
            cars.map((car) => (
              <Card key={car.id} xs={6} sm={6} md={4} lg={3} xl={3}>
                <Card.Header>
                  <Text>{car.dpt}</Text>
                  <Text>{car.brand}</Text>
                </Card.Header>
                <Card.Body>
                  <Card.Image
                    src={car.photoUrl}
                    objectFit="cover"
                    width="100%"
                    height={140}
                    alt={car.model}
                  />
                </Card.Body>
                <Card.Footer>
                  <Text>{car.model}</Text>
                  <Text>{car.km} Km</Text>
                </Card.Footer>
              </Card>
            ))}
        </Grid.Container>
      </Grid.Container>

      <Grid.Container justify="center">
        <div className={styles.btn}>
          <a href="#" onClick={() => setOption("ND")}>
            RETOUR
          </a>
        </div>
     </Grid.Container>
    </Container>
  ) : editMode === "Empty" ? (
    <DptChoiceSAD
      editMode={editMode}
      setOption={setOption}
      setEditMode={setEditMode}
    ></DptChoiceSAD>
  ) : (
    <CarCardSAD
      editMode={editMode}
      setOption={setOption}
      setEditMode={setEditMode}
    ></CarCardSAD>
  );
}
