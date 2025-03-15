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
  orderBy,
} from "firebase/firestore";
import { Button, Grid, Loading } from "@nextui-org/react";
import Link from "next/link";
import TakePicture from "../TakePicture";
import BrandChoice from "../BrandChoice";
import PisteurParc from "../PisteurParc";
import CrdvNouveaux from "../CrdvNouveaux";
import CrdvWaiting from "../CrdvWaiting";
import CsWaiting from "../CsWaiting";
import CsNouveaux from "../CsNouveaux";
import CeWaiting from "../CeWaiting";
import CeNouveaux from "../CeNouveaux";

export default function CE({userIn}) {
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

  const [carsRdv, setCarsRdv] = useState([]);
  const [carsSrdv, setCarsSrdv] = useState([]);

  const parcListRef = collection(db, "parkingChronos");
  useEffect(() => {
    const queryCarsTimeless = query(parcListRef, where("rdv", "==", "RDV"), where("step", "==", "Prestation01"),orderBy("rdvTime","asc"));
    const unsubscribe = onSnapshot(queryCarsTimeless, (querySnapshot) => {
      const carsData = [];

      querySnapshot.forEach((doc) => {
        carsData.push(doc.data());
      });
      setCarsRdv(carsData);
    });

    return unsubscribe; // cleanup function
  }, []);
  useEffect(() => {
    const queryCarsWaiting = query(parcListRef, where("rdv", "==", "SRDV"), where("step", "==", "Prestation01"),orderBy("rdvTime","asc"));
    const unsubscribe = onSnapshot(queryCarsWaiting, (querySnapshot) => {
      const carsDataWaiting = [];

      querySnapshot.forEach((doc) => {
        carsDataWaiting.push(doc.data());
      });
      setCarsSrdv(carsDataWaiting);
    });

    return unsubscribe; // cleanup function
  }, []);




  return option === "ND" ? (
    <>
    <div className={styles.btn}>
        <a href="#" onClick={() => setOption("NOUVEAUX")}>NOUVEAUX</a>
      </div>
      <div className={styles.btn}>
        <a href="#" onClick={() => setOption("WAITING")}>
          Préstation
        </a>
      </div>
      
    </>
  ) : option === "NOUVEAUX" ? (
    <CeNouveaux setOption={setOption} cars={carsRdv} carsWaiting={carsSrdv}  userIn={userIn}></CeNouveaux>
  ) :option === "WAITING" ? (
    < CeWaiting setOption={setOption} carsWaiting={carsSrdv} cars={carsRdv} userIn={userIn} ></CeWaiting>
  ) : (
    <div>error</div>
  );
}
