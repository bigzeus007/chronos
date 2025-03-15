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
import TechChoice from "./TechChoice";

export default function AteliersChoice({
  editMode,
  setOption,
  userIn,
  setEditMode,
  atelier, setAtelier,
}) {
  

  return atelier === "ND" ? (
    <>
      <div className={styles.btn}>
        <a href="#" onClick={() => setAtelier("Express")}>
          Express
        </a>
      </div>
      <div className={styles.btn}>
        <a href="#" onClick={() => setAtelier("Mecanique")}>
          Mecanique
        </a>
      </div>
      <div className={styles.btn}>
        <a href="#" onClick={() => setAtelier("Diagnostic")}>
          Diag
        </a>
      </div>
      <div className={styles.btn}>
        <a href="#" onClick={() => setAtelier("Carrosserie")}>
          Carrosserie
        </a>
      </div>
    </>
  ) : (
    <TechChoice setOption={setOption} atelier={atelier} setAtelier={setAtelier} editMode={editMode} userIn={userIn} setEditMode={setEditMode}></TechChoice>
  );
}
