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
import TechWaiting from "../TechWaiting";

export default function Tech({userIn}) {
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
 

  const parcListRef = collection(db, "parkingChronos");
  useEffect(() => {
    const queryCarsTimeless = query(parcListRef, where("techTeamsUpdated", "array-contains", `${userIn.nom}` ),orderBy("rdvTime","asc"));
    const unsubscribe = onSnapshot(queryCarsTimeless, (querySnapshot) => {
      const carsData = [];

      querySnapshot.forEach((doc) => {
        carsData.push(doc.data());
      });
      setCars(carsData);
    });

    return unsubscribe; // cleanup function
  }, []);
 




  return option === "ND" ? (
    <>
    <div className={styles.btn}>
        <a href="#" onClick={() => setOption("WAITING")}>En attente</a>
      </div>
      <div className={styles.btn}>
        <a href="#" onClick={() => setOption("NOUVEAUX")}>
          RAS
        </a>
      </div>
      
    </>
  ) : option === "WAITING" ? (
    <TechWaiting setOption={setOption} cars={cars} userIn={userIn}></TechWaiting>
  ) :option === "NOUVEAUX" ? (
    < CsWaiting setOption={setOption}  cars={cars} userIn={userIn} ></CsWaiting>
  ) : (
    <div>error</div>
  );
}
