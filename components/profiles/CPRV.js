import { useEffect } from "react";
import { useState } from "react";
import { auth, db } from "../../firebase";
import styles from "../../styles/Button.module.css";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { Button, Grid, Loading } from "@nextui-org/react";
import Link from "next/link";
import TakePicture from "../TakePicture";
import BrandChoice from "../BrandChoice";
import PisteurParc from "../PisteurParc";
import CrdvNouveaux from "../CrdvNouveaux";
import CrdvWaiting from "../CrdvWaiting";

export default function CRDV({userIn}) {
  const [option, setOption] = useState("ND");
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
  }, []);




  return option === "ND" ? (
    <>
      <div className={styles.btn}>
        <a href="#" onClick={() => setOption("NOUVEAUX")}>
          Nouveaux
        </a>
      </div>
      <div className={styles.btn}>
        <a href="#" onClick={() => setOption("WAITING")}>En attente</a>
      </div>
    </>
  ) : option === "NOUVEAUX" ? (
    <CrdvNouveaux setOption={setOption} cars={cars} userIn={userIn}></CrdvNouveaux>
  ) :option === "WAITING" ? (
    < CrdvWaiting setOption={setOption} carsWaiting={carsWaiting} userIn={userIn} ></CrdvWaiting>
  ) : (
    <div>error</div>
  );
}
