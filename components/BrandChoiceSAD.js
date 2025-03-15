'use client';
import { useEffect } from "react";
import { useState } from "react";
import { auth, db } from "../firebase";
import styles from ".././styles/Button.module.css";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { Button, Grid, Loading } from "@nextui-org/react";

import RdvChoice from "./RdvChoice";
import CarCardSAD from "./CarCardSAD";

export default function BrandChoiceSAD({ editMode, setOption, setEditMode, dpt }) {
  const [brand, setBrand] = useState("ND");
  const [carInit, setCarInit] = useState({
    
  });

  return brand === "ND" ? (
    <>
      <div className={styles.btn}>
        <a href="#" onClick={() => setEditMode({
    dpt: dpt,
    brand:"AUDI",
    photoUrl: "../public/AddSADCars.jpg",
    km:0,
    model:"",
    carburant:0,
    imm:"Immatriculation",
  })}>
          AUDI
        </a>
      </div>
      <div className={styles.btn}>
        <a href="#" onClick={() => setEditMode({
          id:"../public/AddSADCars.jpg",
    dpt: dpt,
    brand:"SKODA",
    photoUrl: "https://firebasestorage.googleapis.com/v0/b/terminal00.appspot.com/o/parkingSAD%2FAddSADCars.jpg?alt=media&token=e135e3e1-41f9-4064-8f9f-f5f611b37067",
    km:0,
    model:"",
    carburant:0,
    imm:"Immatriculation",
  })}>
          SKODA
        </a>
      </div>
    </>
  ) : (
    <CarCardSAD editMode={editMode}
    setOption={setOption}
    setEditMode={setEditMode}
    ></CarCardSAD>
  );
}
