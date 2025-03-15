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
import CsChoice from "./CsChoice";


export default function RdvChoice({setOption, brand} ) {
  const [rdv, setRdv] = useState("ND");

  return rdv === "ND" ? (<>
      <div className={styles.btn}>
        <a href="#" onClick={() => setRdv("RDV")}>
          Rendez-vous
        </a>
      </div>
      <div className={styles.btn}>
        <a href="#" onClick={() => setRdv("SRDV")}>
          Nouveau
        </a>
      </div></>) : rdv==="RDV"?(<CsChoice setOption={setOption} brand={brand} rdv={rdv}></CsChoice>):(<TakePicture setOption={setOption} brand={brand} rdv={rdv} csSelected={"ND"} ></TakePicture>);
  }