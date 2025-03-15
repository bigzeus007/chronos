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
import BrandChoiceSAD from "./BrandChoiceSAD";

export default function DptChoiceSAD({ editMode, setOption, setEditMode }) {
  const [dpt, setDpt] = useState("ND");

  return dpt === "ND" ? (
    <>
      <div className={styles.btn}>
        <a href="#" onClick={() => setDpt("SAV")}>
          SAV
        </a>
      </div>
      <div className={styles.btn}>
        <a href="#" onClick={() => setDpt("COMMERCIAL")}>
          COMMERCIAL
        </a>
      </div>
    </>
  ) : (
    <BrandChoiceSAD
      editMode={editMode}
      setOption={setOption}
      setEditMode={setEditMode}
      dpt={dpt}
    ></BrandChoiceSAD>
  );
}
