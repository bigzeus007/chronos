'use client';
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import styles from "../../../styles/Button.module.css";
import "firebase/firestore";
import { db, storage } from "@/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Container,
  Grid,
  Image,
  Input,
  Radio,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function CarCardCsEditMode({ editMode, setOption, userIn, setEditMode }) {
  const car = editMode;
  const userName = userIn.userName;
 
  const [rdvTime, setRdvTime] = useState("");
  const [requestSelected, setRequestSelected] = useState([]);
  const [requestConfirmed, setRequestConfirmed] = useState(false);

  const workingDate = new Date().toISOString().substring(0, 10);
  const carsCollectionRef = collection(db, "parkingChronos");
  const carId = car.id;
  const [dataRequestArray, setDataRequestArray]=useState([]);

  const dataRequestConvert = (array) => {
    let dataRequestArrayInit = [];
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      switch (element) {
        case "exp":
        dataRequestArrayInit.push({ exp: true });
          break;
        case "mec":
            dataRequestArrayInit.push({ mec: true });
          break;
          case "dia":
            dataRequestArrayInit.push({ dia: true });
          break;
        case "dev":
            dataRequestArrayInit.push({ dev: true });
          break;

        default:
          break;
      }
    }
    setDataRequestArray(dataRequestArrayInit)
    return dataRequestArrayInit;
  };

  const handleSubmit = async (carId, requestSelected, rdvTime) => {
    try {
      await setDoc(
        doc(db, "parkingChronos", carId),
        {
          step: "Reception03",
          restitutionTime: rdvTime,
          waitingAlerte: true,
         
          requestSelected: requestSelected,
          // carStory: [
          //     ...car.carStory,
          //   {
          //     qui: userName,
          //     quoi: "traitement crdv",
          //     date: workingDate,
          //     time: new Date().toISOString().substring(11, 16),
          //   },
          // ],
        },
        {
          merge: true,
        }
      );
      setOption("ND");
    } catch (error) {
      console.log(error);
    }
  };

  const availabilityColor = () => {
    switch (car.waitingAlerte) {
      case false:
        return { content: "Encours", color: "success" };

      case true:
        return { content: "Waiting", color: "error" };

      default:
        return "warning";
    }
  };

  return (
    <Grid.Container justify="center">
      <Grid.Container justify="center">
        <Card css={{ width: "200px" }}>
          <Badge
            color={`${availabilityColor().color}`}
            content=""
            variant="dot"
            css={{ p: "0" }}
            horizontalOffset="45%"
            verticalOffset="5%"
          >
            <Card.Image
              src={car.imageUrl}
              objectFit="cover"
              width={200}
              height={140}
              alt={"loading.."}
            />
          </Badge>
          <Card.Footer css={{ justifyItems: "flex-start" }}>
            <Row wrap="wrap" justify="space-between" align="center">
              <Text b>{car.rdv}</Text>
              <Text
                css={{
                  color: "$accents7",
                  fontWeight: "$semibold",
                  fontSize: "$sm",
                }}
              >
                Arrivee : {car.arrivedAt}
              </Text>
            </Row>
          </Card.Footer>
        </Card>
      </Grid.Container>
      
      <Spacer y={1}></Spacer>
      <Grid.Container justify="center">
        {requestConfirmed && (
          <Button
            auto
            css={{ width: "200px" }}
            onPress={() => setRequestConfirmed(false)}
          >
            <Text>Travaux: {requestSelected.join(", ")}</Text>
          </Button>
        )}

        {!requestConfirmed && (
          <Grid.Container justify="center">
            <Grid.Container justify="center">
              <Text color="primary"> Choisir travaux :</Text>
            </Grid.Container>
            <Checkbox.Group
              color="primary"
              labelColor="warning"
              aria-labelledby="Choisir travaux :"
              css={{ justifyContent: "center" }}
              value={requestSelected}
              onChange={setRequestSelected}
            >
              <Grid.Container wrap="wrap">
                <Grid justify="center" xs={12} lg={4} sm={6}>
                  <Checkbox value="exp">Express</Checkbox>
                </Grid>
                <Grid justify="center" xs={12} lg={4} sm={6}>
                  <Checkbox value="mec">Mécanique</Checkbox>
                </Grid>
                <Grid justify="center" xs={12} lg={4} sm={6}>
                  <Checkbox value="dia">Diag</Checkbox>
                </Grid>
                <Grid justify="center" xs={12} lg={4} sm={6}>
                  <Checkbox value="dev">Devis</Checkbox>
                </Grid>
              </Grid.Container>
            </Checkbox.Group>

            <Grid justify="center" xs={12}>
              <Button auto onPress={() => {setRequestConfirmed(true);dataRequestConvert(requestSelected)}}>
                confirmer
              </Button>
            </Grid>
          </Grid.Container>
        )}
      </Grid.Container>
      <Grid.Container justify="center">
        <Grid justify="center">
          <Input
            aria-label="rdvtime"
            type="time"
            labelLeft="Réstitution"
            onChange={(e) => {
              setRdvTime(e.target.value);
              console.log(e.target.value);
            }}
          />
        </Grid>
      </Grid.Container>
      {requestConfirmed  && rdvTime !== "" ? (
        <div className={styles.btn}>
          <a
            href="#"
            onClick={() =>
              handleSubmit(carId, dataRequestArray, rdvTime)
            }
          >
            Envoyer
          </a>
        </div>
      ):(
        <div className={styles.btn}>
          <a
            href="#"
            onClick={() =>
                setEditMode("ND")
            }
          >
            Annuler
          </a>
        </div>
      )}
    </Grid.Container>
  );
}
