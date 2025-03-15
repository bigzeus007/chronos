'use client';
import { useEffect } from "react";
import { useState } from "react";
import { auth, db } from ".././firebase";
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
import Link from "next/link";
import TakePicture from "./TakePicture";


export default function CsChoice({ setOption, brand, rdv, }) {
  const [csSelected, setCsSelected] = useState("ND");

  return brand === "AUDI" && csSelected === "ND" ? (
    <>
      <div className={styles.btn}>
        <a href="#" onClick={() => setCsSelected("AZIZ")}>
          AZIZ
        </a>
      </div>
      <div className={styles.btn}>
        <a href="#" onClick={() => setCsSelected("ABDEL")}>
          ABDEL
        </a>
      </div>
      <div className={styles.btn}>
        <a href="#" onClick={() => setCsSelected("BADR")}>
          BADR
        </a>
      </div>
    </>
  ) : brand === "SKODA" && csSelected === "ND" ? (
    <>
      <div className={styles.btn}>
        <a href="#" onClick={() => setCsSelected("SIMO")}>
          SIMO
        </a>
      </div>
    </>
  ) : (
    <TakePicture setOption={setOption} brand={brand} rdv={rdv} csSelected={csSelected}></TakePicture>
  );
}
