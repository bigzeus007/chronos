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

export default function DptChoice({ setOption }) {
  const [dpt, setDpt] = useState("ND");

  return dpt === "ND" ? (
    <>
      <div className={styles.btn}>
        <a href="#" onClick={() => setDpt("Courtoisie")}>
        Courtoisie
        </a>
      </div>
      <div className={styles.btn}>
        <a href="#" onClick={() => setBrand("TestDrive")}>
          Test-Drive
        </a>
      </div>
    </>
  ) : (
    <div> CarsList </div>
   //<CarsList setOption={setOption} dpt={dpt}></CarsList>
  );
}
