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
import AteliersChoice from "@/components/AteliersChoice";

export default function CarCardCeEditMode({
  editMode,
  setOption,
  userIn,
  setEditMode,
}) {
  const car = editMode;
  const userName = userIn.userName;

  const [atelier, setAtelier] = useState("ND");

 
  const [rdvTime, setRdvTime] = useState("");
  const [affectationStep, setAffectationStep] = useState(0);
  const [requestSelected, setRequestSelected] = useState([]);
  const [requestConfirmed, setRequestConfirmed] = useState(false);

  const workingDate = new Date().toISOString().substring(0, 10);
  const carsCollectionRef = collection(db, "parkingChronos");
  const carId = car.id;
  const [dataRequestArray, setDataRequestArray] = useState([]);

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
    setDataRequestArray(dataRequestArrayInit);
    return dataRequestArrayInit;
  };

  const handleSubmit = async (carId, requestSelected, rdvTime) => {
    try {
      await setDoc(
        doc(db, "parkingChronos", carId),
        {
          step: "Prestation01",
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
                Livraison : {car.restitutionTime}
              </Text>
            </Row>
          </Card.Footer>
        </Card>
      </Grid.Container>

      <Spacer y={1}></Spacer>
      <Grid.Container>
      {affectationStep==0 && <AteliersChoice atelier={atelier} setAtelier={setAtelier} editMode={editMode} setOption={setOption} userIn={userIn} setEditMode={setEditMode}></AteliersChoice>}
       

        
      </Grid.Container>

    
        <div className={styles.btn}>
          <a href="#" onClick={() => setEditMode("ND")}>
            Annuler
          </a>
        </div>
      
    </Grid.Container>
  );
}
