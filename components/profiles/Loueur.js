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

import DptChoice from "../DptChoice";
import ModifierParc from "../ModifierParc";

export default function Loueur({userIn}) {
  const [option, setOption] = useState("ND");

  const [cars, setCars] = useState([]);
 

  const parcListRef = collection(db, "parkingSAD");
  useEffect(() => {
    
    const unsubscribe = onSnapshot(parcListRef, (querySnapshot) => {
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
        <a href="#" onClick={() => setOption("Modifier")}>
          Modifier
        </a>
      </div>
      <div className={styles.btn}>
        <a href="#" onClick={() => setOption("PARC")}>Parc</a>
      </div>
    </>
  ) : option === "Modifier" ? (
    <ModifierParc setOption={setOption} cars={cars}></ModifierParc>
  ) :option === "PARC" ? (
    < DptChoice setOption={setOption} cars={cars}></DptChoice>
  ) : (
    <div>error</div>
  );
}
