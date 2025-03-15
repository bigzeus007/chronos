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

import RdvChoice from "./RdvChoice";

export default function BrandChoice({ setOption }) {
  const [brand, setBrand] = useState("ND");

  return brand === "ND" ? (
    <>
      <div className={styles.btn}>
        <a href="#" onClick={() => setBrand("AUDI")}>
          AUDI
        </a>
      </div>
      <div className={styles.btn}>
        <a href="#" onClick={() => setBrand("SKODA")}>
          SKODA
        </a>
      </div>
    </>
  ) : (
    <RdvChoice setOption={setOption} brand={brand}></RdvChoice>
  );
}
